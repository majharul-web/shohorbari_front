import { Button } from "@/components/ui/button";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { toCapitalizeString } from "@/utils/common";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../ui/alert/Alert";
import InputField from "../ui/form/InputField";
import CustomModal from "../ui/modal/CustomModal";

const CategorySchema = Yup.object().shape({
  name: Yup.string().min(1, "Name is required").required("Name is required"),
});

interface CategoryModalProps {
  mode: "add" | "edit";
  initialData?: { id: string; name: string };
}

const CategoryModal: React.FC<CategoryModalProps> = ({ mode, initialData }) => {
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();

  const isLoading = creating || updating;

  // ✅ handle add / edit
  const handleSubmit = async (
    values: { name: string },
    {
      resetForm,
      setSubmitting,
      closeModal,
    }: {
      resetForm: () => void;
      setSubmitting: (isSubmitting: boolean) => void;
      closeModal: () => void;
    }
  ) => {
    try {
      if (mode === "add") {
        const res = await createCategory(values).unwrap();
        Alert({
          type: "success",
          message: `Category "${res.name}" created successfully`,
        });
      } else {
        if (!initialData?.id) throw new Error("Category ID is required for editing");
        const res = await updateCategory({ id: initialData.id, ...values }).unwrap();
        Alert({
          type: "success",
          message: `Category "${res.name}" updated successfully`,
        });
      }
      resetForm();
      closeModal();
    } catch (err: any) {
      console.error("Error:", err);
      const errorMessage = err?.data?.detail || "Category operation failed";
      Alert({
        type: "error",
        message: `${toCapitalizeString(errorMessage)}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CustomModal
      triggerLabel={mode === "add" ? "Add Category" : "Edit"}
      title={mode === "add" ? "Add Category" : "Edit Category"}
    >
      {({ closeModal }) => (
        <Formik
          initialValues={{ name: initialData?.name || "" }}
          enableReinitialize
          validationSchema={CategorySchema}
          onSubmit={(values, formikHelpers) => handleSubmit(values, { ...formikHelpers, closeModal })}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4'>
              <InputField label='Name' name='name' type='text' />

              <Button type='submit' disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading
                  ? mode === "add"
                    ? "Creating..."
                    : "Updating..."
                  : mode === "add"
                  ? "Create"
                  : "Update"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default CategoryModal;
