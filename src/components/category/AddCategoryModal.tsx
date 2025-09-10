import { Button } from "@/components/ui/button";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { toCapitalizeString } from "@/utils/common";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../ui/alert/Alert";
import InputField from "../ui/form/InputField";
import CustomModal from "../ui/modal/CustomModal";

const CategorySchema = Yup.object().shape({
  name: Yup.string().min(1, "Name is required").required("Name is required"),
});

const AddCategoryModal = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  // ✅ put handleSubmit outside of return
  const handleSubmit = async (
    values: { name: string },
    {
      resetForm,
      setSubmitting,
      closeModal, // we’ll inject closeModal into Formik context
    }: {
      resetForm: () => void;
      setSubmitting: (isSubmitting: boolean) => void;
      closeModal: () => void;
    }
  ) => {
    try {
      const res = await createCategory(values).unwrap();
      Alert({
        type: "success",
        message: `Category "${res.name}" created successfully`,
      });
      resetForm();
      closeModal(); // ✅ close modal after success
    } catch (err: any) {
      console.error("Error:", err);
      const errorMessage = err?.data?.detail || "Category creation failed";
      Alert({
        type: "error",
        message: `${toCapitalizeString(errorMessage)}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CustomModal triggerLabel='Add Category' title='Add Category'>
      {({ closeModal }) => (
        <Formik
          initialValues={{ name: "" }}
          validationSchema={CategorySchema}
          onSubmit={(values, formikHelpers) => handleSubmit(values, { ...formikHelpers, closeModal })}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4'>
              <InputField label='Name' name='name' type='text' />

              <Button type='submit' disabled={isSubmitting || isLoading} loading={isLoading}>
                {isSubmitting || isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default AddCategoryModal;
