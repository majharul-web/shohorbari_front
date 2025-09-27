import { Button } from "@/components/ui/button";
import { useCreateAdRequestMutation } from "@/redux/api/adsApi";
import { useAppSelector } from "@/redux/hooks";
import { toCapitalizeString } from "@/utils/common";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { Alert } from "../ui/alert/Alert";
import InputField from "../ui/form/InputField";
import TextAreaField from "../ui/form/TextAreaField";
import CustomModal from "../ui/modal/CustomModal";

interface RentRequestModalProps {
  add: Record<string, any>;
}

const RentRequestSchema = Yup.object().shape({
  name: Yup.string().min(1, "Name is required").required("Name is required"),
  phone: Yup.string().min(1, "Phone is required").required("Phone is required"),
  address: Yup.string().min(1, "Address is required").required("Address is required"),
  message: Yup.string().min(1, "Message is required").required("Message is required"),
});

const RentRequestModal: React.FC<RentRequestModalProps> = ({ add }) => {
  const [createAdRequest, { isLoading }] = useCreateAdRequestMutation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth);

  const handleSubmit = async (
    values: { message: string; name: string; phone: string; address: string },
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
    const payload: {
      message: string;
      add_id: any;
      additional_name?: string;
      additional_phone?: string;
      additional_address?: string;
    } = {
      message: values.message,
      add_id: add.id,
    };
    if (values?.name && values?.name !== user?.userName) {
      payload.additional_name = values.name;
    }
    if (values?.phone && values?.phone !== user?.phone) {
      payload.additional_phone = values.phone;
    }
    if (values?.address && values?.address !== user?.address) {
      payload.additional_address = values.address;
    }

    try {
      const res = await createAdRequest(payload).unwrap();
      Alert({
        type: "success",
        message: res?.data?.message || `Rent request "${res?.name || values.message}" created successfully`,
      });
      resetForm();
      closeModal();
      navigate(`/payment-initiate?amount=${add.price}&orderId=${res.id}`);
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
    <CustomModal triggerLabel='Request for Get' title='Create Rent Request' requireAuth={true}>
      {({ closeModal }) => (
        <Formik
          initialValues={{
            message: "",
            name: user?.userName || "",
            phone: user?.phone ? String(user.phone) : "",
            address: user?.address || "",
          }}
          validationSchema={RentRequestSchema}
          onSubmit={(values, formikHelpers) => handleSubmit(values, { ...formikHelpers, closeModal })}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4'>
              <InputField name='name' label='Name' />
              <InputField name='phone' label='Phone' />
              <InputField name='address' label='Address' />
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
