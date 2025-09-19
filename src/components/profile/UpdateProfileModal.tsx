// UpdateProfileModal.tsx
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/form/InputField";
import { useUpdateUserProfileMutation } from "@/redux/api/authApi";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Alert } from "../ui/alert/Alert";
import CustomModal from "../ui/modal/CustomModal";

interface UpdateProfileModalProps {
  triggerLabel: string;
  title: string;
  user: any;
  type: "info" | "image"; // info -> name, phone, address; image -> profile image only
  onUpdate?: (user: any) => void;
}

interface InfoFormValues {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
}

interface ImageFormValues {
  profile_image: File | null;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  triggerLabel,
  title,
  user,
  type,
  onUpdate,
}) => {
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const initialInfoValues: InfoFormValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    address: user?.address || "",
  };

  const initialImageValues: ImageFormValues = {
    profile_image: null,
  };

  const infoValidationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone_number: Yup.string(),
    address: Yup.string(),
  });

  const imageValidationSchema = Yup.object({
    profile_image: Yup.mixed().required("Profile image is required"),
  });

  return (
    <CustomModal triggerLabel={triggerLabel} title={title}>
      {({ closeModal }) => (
        <Formik
          initialValues={type === "info" ? initialInfoValues : initialImageValues}
          validationSchema={type === "info" ? infoValidationSchema : imageValidationSchema}
          onSubmit={async (values: any) => {
            try {
              let payload;
              if (type === "info") {
                payload = { ...values };
              } else if (type === "image") {
                payload = new FormData();
                if (values.profile_image) payload.append("profile_image", values.profile_image);
              }

              const updatedUser: any = await updateProfile(payload).unwrap();
              Alert({
                type: "success",
                message: "Profile updated successfully",
              });
              onUpdate?.(updatedUser);
              closeModal();
            } catch (err: any) {
              Alert({
                type: "error",
                message: err?.data?.detail ?? err?.data?.profile_image[0] ?? "Update failed",
              });
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className='space-y-4'>
              {type === "info" ? (
                <>
                  <InputField label='First Name' name='first_name' />
                  <InputField label='Last Name' name='last_name' />
                  <InputField label='Phone Number' name='phone_number' />
                  <InputField label='Address' name='address' />
                </>
              ) : (
                <>
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt='Profile'
                      className='h-28 w-28 rounded-full object-cover border border-gray-200 mx-auto mb-4'
                    />
                  ) : (
                    <div className='h-28 w-28 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600 mx-auto mb-4'>
                      {user.first_name?.[0]}
                      {user.last_name?.[0]}
                    </div>
                  )}
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => setFieldValue("profile_image", e.target.files?.[0] || null)}
                    className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-border file:text-sm file:font-semibold file:bg-muted file:text-foreground hover:file:bg-primary hover:file:text-primary-foreground transition'
                  />
                </>
              )}

              <Button type='submit' className='w-full font-semibold' disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default UpdateProfileModal;
