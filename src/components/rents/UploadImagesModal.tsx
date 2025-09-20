// UploadImagesModal.tsx
import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/ui/modal/CustomModal";
import { useUploadAdditionalImagesMutation } from "@/redux/api/adsApi";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

interface UploadImagesModalProps {
  adId: string | number;
  triggerLabel?: string; // optional, for manual trigger
  onUploaded?: (images: any) => void;
  isOpen?: boolean; // controlled open
  onClose?: () => void; // controlled close
}

interface FormValues {
  images: FileList | null;
}

const UploadImagesModal: React.FC<UploadImagesModalProps> = ({
  adId,
  triggerLabel = "Upload Images",
  onUploaded,
  isOpen,
  onClose,
}) => {
  const [uploadAdditionalImages, { isLoading: isUploading }] = useUploadAdditionalImagesMutation();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const initialValues: FormValues = { images: null };

  const validationSchema = Yup.object({
    images: Yup.mixed().required("Please select at least one image"),
  });

  const handlePreview = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);
  };

  return (
    <CustomModal triggerLabel={triggerLabel} title='Upload Additional Images'>
      {({ closeModal }) => (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (!values.images) return;
            try {
              const formData = new FormData();
              Array.from(values.images).forEach((file) => formData.append("image", file));
              formData.append("advertisement", adId.toString());

              const payload = { adId, formData };

              const res = await uploadAdditionalImages(payload).unwrap();
              Alert({ type: "success", message: "Images uploaded successfully" });
              onUploaded?.(res);
              resetForm();
              setPreviewImages([]);
              closeModal(); // close modal after upload
            } catch (err: any) {
              Alert({
                type: "error",
                message: err?.data?.detail ?? "Failed to upload images",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className='space-y-4'>
              <input
                type='file'
                accept='image/*'
                multiple
                onChange={(e) => {
                  setFieldValue("images", e.target.files);
                  handlePreview(e.target.files);
                }}
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-border file:text-sm file:font-semibold file:bg-muted file:text-foreground hover:file:bg-primary hover:file:text-primary-foreground transition'
              />

              {/* Preview selected images */}
              {previewImages.length > 0 && (
                <div className='grid grid-cols-3 gap-2'>
                  {previewImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`preview-${idx}`}
                      className='h-24 w-full object-cover rounded-md'
                    />
                  ))}
                </div>
              )}

              <Button type='submit' className='w-full font-semibold' disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default UploadImagesModal;
