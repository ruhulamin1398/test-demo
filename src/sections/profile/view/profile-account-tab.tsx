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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// ----------------------------------------------------------------------

export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>;

export const UpdateUserSchema = zod.object({
  firstName: zod.string().min(1, { message: "First Name is required!" }),
  lastName: zod.string().min(1, { message: "Last Name is required!" }),
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  profilePicture: schemaHelper.file({ message: "Avatar is required!" }),
  // phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
});

// ----------------------------------------------------------------------

export function ProfileAccountTab() {
  const user = useSelector((state: RootState) => state.auth.user);

  const currentUser: UpdateUserSchemaType = {
    firstName: user?.firstName || "firstName",
    lastName: user?.lastName || "lastName",
    email: user?.email || "user@user.com",
    profilePicture: user?.profilePicture || "",
  };

  const defaultValues: UpdateUserSchemaType = {
    firstName: "",
    lastName: "",
    email: "",
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Update success!");
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
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

              <Button variant="soft" color="error" sx={{ mt: 3 }}>
                Delete user
              </Button>
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
      <ProfileSecurityTab />
    </>
  );
}
