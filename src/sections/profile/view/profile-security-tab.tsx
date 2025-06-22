import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";
import { Form, Field } from "@/components/hook-form";
import { CardHeader } from "@mui/material";
import { CHANGE_PASSWORD_MUTATION } from "@/graphql-client/auth";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export type ChangePassWordSchemaType = zod.infer<typeof ChangePassWordSchema>;

export const ChangePassWordSchema = zod
  .object({
    oldPassword: zod
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),

    newPassword: zod
      .string()
      .min(1, { message: "New password is required!" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    confirmNewPassword: zod
      .string()
      .min(1, { message: "Confirm password is required!" }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different than old password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match!",
    path: ["confirmNewPassword"],
  });

// ----------------------------------------------------------------------

export function ProfileSecurityTab() {
  const [changePassword, { loading, error, data }] = useMutation(
    CHANGE_PASSWORD_MUTATION
  );

  const showPassword = useBoolean();

  const defaultValues: ChangePassWordSchemaType = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const methods = useForm<ChangePassWordSchemaType>({
    mode: "all",
    resolver: zodResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.info("password reset data ", data);
      await changePassword({
        variables: {
          currentPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      });

      reset();
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (data) {
      toast.success("Update success!");
    }
    if (error) {
      toast.error(error.message || "Something went wrong!");
    }
  }, [data, error, loading]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card
        sx={{
          px: 3,
          pb: 3,
          gap: 3,
          display: "flex",
          flexDirection: "column",
          mt: { xs: 2, md: 6 },
        }}
      >
        <CardHeader title="Change Password" />

        <Field.Text
          name="oldPassword"
          type={showPassword.value ? "text" : "password"}
          label="Old password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={
                        showPassword.value
                          ? "solar:eye-bold"
                          : "solar:eye-closed-bold"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Field.Text
          name="newPassword"
          label="New password"
          type={showPassword.value ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={
                        showPassword.value
                          ? "solar:eye-bold"
                          : "solar:eye-closed-bold"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          helperText={
            <Box
              component="span"
              sx={{ gap: 0.5, display: "flex", alignItems: "center" }}
            >
              <Iconify icon="eva:info-fill" width={16} /> Password must be
              minimum 6+
            </Box>
          }
        />

        <Field.Text
          name="confirmNewPassword"
          type={showPassword.value ? "text" : "password"}
          label="Confirm new password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={
                        showPassword.value
                          ? "solar:eye-bold"
                          : "solar:eye-closed-bold"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ ml: "auto" }}
        >
          Save changes
        </LoadingButton>
      </Card>
    </Form>
  );
}
