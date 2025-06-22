import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "react-phone-number-input/input";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import { fData } from "@/utils/format-number";

import { toast } from "@/components/snackbar";
import { Form, Field, schemaHelper } from "@/components/hook-form";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { _mock, USER_STATUS_OPTIONS } from "@/_mock";
import { MenuItem } from "@mui/material";
import { GenderEnum, IPhoneNumber } from "@/interfaces";
import { LocalizationProvider } from "@/locales";
import { useMutation } from "@apollo/client";
import {
  UPDATE_GENERAL_INFO_MUTATION,
  UPDATE_PROFILE_AVATAR_MUTATION,
} from "@/graphql-client/auth";
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
  const [updateProfileAvatar, { loading, error, data }] = useMutation(
    UPDATE_PROFILE_AVATAR_MUTATION
  );

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
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (profilePicture && profilePicture instanceof File) {
      console.log("Profile picture file changed:", profilePicture);

      updateProfilePicture(profilePicture);
    }
  }, [profilePicture]);

  const updateProfilePicture = async (profilePicture: File) => {
    try {
      const uploadbleContent = profilePicture as File;
      const response = await uploadFile(
        uploadbleContent,
        `/api/upload/user-image`,
        {
          userId: user?.id,
        }
      );
      if (response.data) {
        toast.dismiss();
        console.log(response.data);

        try {
          console.log("Submitting data:", response.data);

          await updateProfileAvatar({
            variables: {
              avatarUrl: response?.data?.url,
            },
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        toast.dismiss();
        console.log("Something went wrong");
        // TODO: Handle error
      }
    } catch (err) {
      console.log("err");
    }
  };

  const onSubmit = handleSubmit(async (data: UpdateUserSchemaType) => {
    console.log("Submitting data:", data);
  });

  useEffect(() => {
    if (data) {
      toast.success(" Avatar updated successfully!");
      dispatch(setUser({ ...user, ...data.updateProfileAvatar }));
      // TODO:  update the profile  in the redux
    }
    if (error) {
      toast.error(error.message || "Something went wrong!");
    }
  }, [data, error, loading]);

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
