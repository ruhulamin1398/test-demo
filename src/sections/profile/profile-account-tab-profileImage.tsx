import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Typography, Card, Grid2 as Grid } from "@mui/material";

import { fData } from "@/utils/format-number";

import { toast } from "@/components/snackbar";
import { Form, Field, schemaHelper } from "@/components/hook-form";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { _mock } from "@/_mock";
import { useEffect } from "react";
import { useFileUpload } from "@/app/hooks/useFileUpload";
import { setUser } from "@/store/slices/authSlice";

// ----------------------------------------------------------------------

export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>;

export const UpdateUserSchema = zod.object({
  profilePicture: schemaHelper.file({ message: "Avatar is required!" }),
});

// ----------------------------------------------------------------------

const ProfileAccountTabProfileImage = () => {
  const dispatch = useDispatch();
  const {
    uploadFile,
    isLoading,
    progress,
    error: uploadError,
  } = useFileUpload();

  const user = useSelector((state: RootState) => state.auth.user);

  const currentUser: UpdateUserSchemaType = {
    profilePicture: user?.profilePicture || null,
  };

  const defaultValues: UpdateUserSchemaType = {
    profilePicture: null,
  };

  const methods = useForm<UpdateUserSchemaType>({
    mode: "all",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    values: currentUser,
  });
  const { watch } = methods;
  const profilePicture = watch("profilePicture");
  const { handleSubmit, formState } = methods;

  useEffect(() => {
    if (profilePicture && profilePicture instanceof File) {
      // console.log("Profile picture file changed:", profilePicture);
      if (formState.isSubmitting) return;

      updateProfilePicture(profilePicture);
    }
  }, [profilePicture]);

  const updateProfilePicture = async (profilePicture: File) => {
    try {
      const uploadbleContent = profilePicture as File;
      const response = await uploadFile(
        uploadbleContent,
        `/api/upload/profile-image`
      );
      if (response.data) {
        toast.dismiss();
        toast.success("Successfully updated");
        const imageUrl = response?.data?.mediaUrl || "";
        dispatch(setUser({ ...user, profilePicture: imageUrl }));
      } else {
        toast.dismiss();
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.log("err");
    }
  };

  const onSubmit = handleSubmit(async (data: UpdateUserSchemaType) => {
    console.log("Submitting data:", data);
  });

  useEffect(() => {
    if (isLoading && progress != 100) {
      toast.dismiss();
      toast.loading("uploading....");
    }
  }, [isLoading, progress]);

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <Form methods={methods} onSubmit={onSubmit}>
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              textAlign: "center",
            }}
          >
            <Field.UploadAvatar
              name="profilePicture"
              maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.disabled",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Form>
      </Grid>
    </>
  );
};
export default ProfileAccountTabProfileImage;
