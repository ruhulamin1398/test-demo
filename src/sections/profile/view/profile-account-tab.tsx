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

import { ProfileSecurityTab } from "./profile-security-tab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { _mock, USER_STATUS_OPTIONS } from "@/_mock";
import { MenuItem } from "@mui/material";
import { GenderEnum } from "@/interfaces";
import { LocalizationProvider } from "@/locales";
import { useMutation } from "@apollo/client";
import { UPDATE_GENERAL_INFO_MUTATION } from "@/graphql-client/auth";
import { useEffect } from "react";
import { useFileUpload } from "@/app/hooks/useFileUpload";

// ----------------------------------------------------------------------

export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>;

export const UpdateUserSchema = zod.object({
  firstName: zod.string().min(1, { message: "First Name is required!" }),
  lastName: zod.string().min(1, { message: "Last Name is required!" }),
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  country: schemaHelper.nullableInput(
    zod.string().min(1, { message: "Country is required!" }),
    {
      message: "Country is required!",
    }
  ),
  gender: schemaHelper.nullableInput(zod.nativeEnum(GenderEnum), {
    message: "Gender is required!",
  }),
  dob: zod
    .preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg),
      zod.date()
    )
    .nullable(),
  profilePicture: schemaHelper.file({ message: "Avatar is required!" }),
});

// ----------------------------------------------------------------------

export function ProfileAccountTab() {
  const dispatch = useDispatch();
  const {
    uploadFile,
    isLoading,
    progress,
    error: uploadError,
  } = useFileUpload();

  const user = useSelector((state: RootState) => state.auth.user);
  const [updateGeneralInfo, { loading, error, data }] = useMutation(
    UPDATE_GENERAL_INFO_MUTATION
  );
  const currentUser: UpdateUserSchemaType = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "user@user.com",
    phoneNumber: user?.phoneNumber || "+8801000000000",
    country: user?.country || "Bangladesh",
    profilePicture: user?.profilePicture || null,
    gender: user?.gender || GenderEnum.NA,
    dob: user?.dob ? new Date(user.dob) : null,
  };

  const defaultValues: UpdateUserSchemaType = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: null,
    gender: GenderEnum.NA,
    dob: null,
    profilePicture: null,
  };

  const methods = useForm<UpdateUserSchemaType>({
    mode: "all",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    values: currentUser,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: UpdateUserSchemaType) => {
    console.info("DATA", data);

    let profilePictureToUpload = data.profilePicture;
    if (profilePictureToUpload && typeof profilePictureToUpload === "object") {
      console.info("Profile picture is an object, preparing to upload...");
      console.log("profilePictureToUpload", profilePictureToUpload);

      try {
        const uploadbleContent = profilePictureToUpload as File;
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
          data.profilePicture = response?.data?.url;
          // toast.success("Upload successful");
        } else {
          toast.dismiss();
          console.log("Something went wrong");
          // TODO: Handle error
        }
      } catch (err) {
        console.log("err");
      }
    } else {
      console.info(
        "Profile picture is not an object, skipping upload.",
        data.profilePicture
      );
    }

    try {
      console.log("Submitting data:", data);
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // toast.success("Update success!");
      await updateGeneralInfo({
        variables: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          country: data.country,
          gender: data.gender,
          dob: data.dob,
          profilePicture: data.profilePicture,
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (data) {
      toast.success("Update success!");
      // TODO:  update the user in the redux
    }
    if (error) {
      toast.error(error.message || "Something went wrong!");
    }
  }, [data, error, loading]);
  return (
    <>
      <LocalizationProvider>
        <Form methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
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

                {/* <Button variant="soft" color="error" sx={{ mt: 3 }}>
                Delete user
              </Button> */}
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={{ p: 3, mb: 3 }}>
                <Box
                  sx={{
                    rowGap: 3,
                    columnGap: 2,
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                  }}
                >
                  <Field.Text name="firstName" label="First Name" />
                  <Field.Text name="lastName" label="Last Name" />
                  <Field.Text name="email" label="Email address" />

                  <Field.DatePicker name="dob" label="Date of Birth" />
                  <Field.Select
                    name="gender"
                    label="Gender"
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                  >
                    {Object.values(GenderEnum).map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Field.Select>
                  <Field.Phone name="phoneNumber" label="Phone number" />
                  <Field.CountrySelect
                    fullWidth
                    name="country"
                    label="Country"
                    placeholder="Choose a country"
                  />
                </Box>

                <Stack spacing={3} sx={{ mt: 3, alignItems: "flex-end" }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Save changes
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </LocalizationProvider>
      <ProfileSecurityTab />
    </>
  );
}
