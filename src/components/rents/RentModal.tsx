import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/form/InputField";
import SelectField from "@/components/ui/form/SelectField";
import TextAreaField from "@/components/ui/form/TextAreaField";
import CustomModal from "@/components/ui/modal/CustomModal";
import { useCreateAdMutation, useUpdateAdMutation } from "@/redux/api/adsApi";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { toCapitalizeString } from "@/utils/common";
import { Form, Formik } from "formik";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const RentSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  title: Yup.string().max(255, "Title must not exceed 255 characters").required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
});

interface RentModalProps {
  mode: "add" | "edit";
  initialData?: {
    id: string;
    category: string;
    title: string;
    description: string;
    price: number;
  };
}

const RentModal: React.FC<RentModalProps> = ({ mode, initialData }) => {
  const [createRent, { isLoading: creating }] = useCreateAdMutation();
  const [updateRent, { isLoading: updating }] = useUpdateAdMutation();
  const { data, isLoading: catLoading } = useGetAllCategoriesQuery({}, { refetchOnMountOrArgChange: true });

  const categories = useMemo(
    () =>
      (data?.results || []).map((cat: any) => ({
        label: cat.name,
        value: cat.id.toString(),
      })),
    [data]
  );

  const isLoading = creating || updating;

  const navigate = useNavigate();

  console.log("Initial Data:", initialData);

  const handleSubmit = async (
    values: { category: string; title: string; description: string; price: number },
    {
      resetForm,
      setSubmitting,
      closeModal,
    }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void; closeModal: () => void }
  ) => {
    try {
      let res;
      if (mode === "add") {
        res = await createRent(values).unwrap();
        Alert({ type: "success", message: `Rent "${res.title}" created successfully` });
      } else {
        if (!initialData?.id) throw new Error("Rent ID is required for editing");
        res = await updateRent({ id: initialData.id, ...values }).unwrap();
        Alert({ type: "success", message: `Rent "${res.title}" updated successfully` });
      }
      resetForm();
      closeModal();
      navigate(`/dashboard/ads/advance/${res.id}`);
    } catch (err: any) {
      console.error("Error:", err);
      const errorMessage = err?.data?.detail || "Rent operation failed";
      Alert({ type: "error", message: `${toCapitalizeString(errorMessage)}` });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CustomModal
        requireAuth={true}
        triggerLabel={mode === "add" ? "Add Rent" : "Edit Rent"}
        title={mode === "add" ? "Add New Rent" : "Edit Rent"}
      >
        {({ closeModal }) => (
          <Formik
            initialValues={{
              category: initialData?.category?.toString() || "",
              title: initialData?.title || "",
              description: initialData?.description || "",
              price: initialData?.price || "",
            }}
            enableReinitialize
            validationSchema={RentSchema}
            onSubmit={(values, formikHelpers) =>
              handleSubmit({ ...values, price: Number(values.price) }, { ...formikHelpers, closeModal })
            }
          >
            {({ isSubmitting, values, setFieldValue, isValid, dirty }) => (
              <Form className='space-y-4'>
                <SelectField
                  label='Category'
                  options={categories}
                  value={values.category}
                  onChange={(val) => setFieldValue("category", val)} // val is string
                />

                <InputField label='Title' name='title' type='text' />
                <TextAreaField
                  label='Description'
                  name='description'
                  rows={4}
                  placeholder='Enter description'
                />
                <InputField label='Price' name='price' type='number' />

                <div className='flex justify-end'>
                  <Button type='submit' disabled={isSubmitting || isLoading || !isValid || !dirty}>
                    {isSubmitting || isLoading
                      ? mode === "add"
                        ? "Creating..."
                        : "Updating..."
                      : mode === "add"
                      ? "Create"
                      : "Update"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </CustomModal>
    </>
  );
};

export default RentModal;
