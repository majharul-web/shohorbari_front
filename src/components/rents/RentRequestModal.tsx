import { Button } from "@/components/ui/button";
import { useCreateAdRequestMutation } from "@/redux/api/adsApi";
import { toCapitalizeString } from "@/utils/common";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { Alert } from "../ui/alert/Alert";
import TextAreaField from "../ui/form/TextAreaField";
import CustomModal from "../ui/modal/CustomModal";

interface RentRequestModalProps {
  adId: number;
}

const RentRequestSchema = Yup.object().shape({
  message: Yup.string().min(1, "Message is required").required("Message is required"),
});

const RentRequestModal: React.FC<RentRequestModalProps> = ({ adId }) => {
  const [createAdRequest, { isLoading }] = useCreateAdRequestMutation();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: { message: string },
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
      const res = await createAdRequest({ message: values.message, add_id: adId }).unwrap();
      Alert({
        type: "success",
        message: res?.data?.message || `Rent request "${res?.name || values.message}" created successfully`,
      });
      resetForm();
      closeModal();
      navigate(`/payment-initiate/${res.id}`);
    } catch (err: any) {
      console.error("Error:", err);
      const errorMessage = err?.data?.detail || "Rent request failed";
      Alert({
        type: "error",
        message: `${toCapitalizeString(errorMessage)}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CustomModal triggerLabel='Request for Get' title='Create Rent Request'>
      {({ closeModal }) => (
        <Formik
          initialValues={{ message: "" }}
          validationSchema={RentRequestSchema}
          onSubmit={(values, formikHelpers) => handleSubmit(values, { ...formikHelpers, closeModal })}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4'>
              <TextAreaField name='message' label='Message' placeholder='Enter your rent request message' />

              <div className='flex justify-end'>
                <Button type='submit' disabled={isSubmitting || isLoading}>
                  {isSubmitting || isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default RentRequestModal;
