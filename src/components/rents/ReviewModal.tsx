import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/ui/form/SelectField";
import TextAreaField from "@/components/ui/form/TextAreaField";
import CustomModal from "@/components/ui/modal/CustomModal";
import { useGiveReviewMutation } from "@/redux/api/adsApi";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const ReviewSchema = Yup.object().shape({
  comment: Yup.string().required("Comment is required"),
  rating: Yup.number()
    .typeError("Rating must be a number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),
});

interface ReviewModalProps {
  adId: number; // ID of the ad being reviewed
}

const ratingOptions = [
  { label: "1 - Poor", value: 1 },
  { label: "2 - Fair", value: 2 },
  { label: "3 - Good", value: 3 },
  { label: "4 - Very Good", value: 4 },
  { label: "5 - Excellent", value: 5 },
];

const ReviewModal: React.FC<ReviewModalProps> = ({ adId }) => {
  const [giveReview, { isLoading: reviewing }] = useGiveReviewMutation();

  const handleSubmit = async (
    values: { comment: string; rating: number },
    { resetForm, setSubmitting, closeModal }: any
  ) => {
    try {
      await giveReview({ adId, ...values }).unwrap();
      Alert({ type: "success", message: "Review submitted successfully" });
      resetForm();
      closeModal();
    } catch (err: any) {
      console.error("Error submitting review:", err);
      Alert({
        type: "error",
        message: err?.data?.detail || "Failed to submit review",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CustomModal triggerLabel='Give Review' title='Submit Your Review'>
      {({ closeModal }) => (
        <Formik
          initialValues={{ comment: "", rating: 5 }}
          validationSchema={ReviewSchema}
          onSubmit={(values, formikHelpers) => handleSubmit(values, { ...formikHelpers, closeModal })}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className='space-y-4'>
              <TextAreaField label='Comment' name='comment' rows={4} placeholder='Write your review...' />

              <SelectField
                label='Rating'
                value={values.rating}
                // onChange={handleChange("rating")}
                onChange={(val) => setFieldValue("rating", val)}
                options={ratingOptions}
              />

              <div className='flex justify-end'>
                <Button type='submit' disabled={isSubmitting || reviewing}>
                  {isSubmitting || reviewing ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default ReviewModal;
