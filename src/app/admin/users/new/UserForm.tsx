import type { IUserItem } from "src/types/user";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/input";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { toast } from "src/components/snackbar";
import { Form, Field, schemaHelper } from "src/components/hook-form";
import { MenuItem } from "@mui/material";
import { AuthProviderEnum, GenderEnum, IUser, RoleEnum } from "@/interfaces";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export type UserSchemaType = zod.infer<typeof UserSchema>;

export const UserSchema = zod.object({
  avatarUrl: schemaHelper.file({ message: "Avatar is required!" }),
  name: zod.string().min(1, { message: "Name is required!" }),
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  country: schemaHelper.nullableInput(
    zod.string().min(1, { message: "Country is required!" }),
    {
      // message for null value
      message: "Country is required!",
    }
  ),
  gender: schemaHelper.nullableInput(
    zod.string().min(1, { message: "Gender is required!" }),
    {
      // message for null value
      message: "Gender is required!",
    }
  ),
  address: zod.string().min(1, { message: "Address is required!" }),
  company: zod.string().min(1, { message: "Company is required!" }),
  state: zod.string().min(1, { message: "State is required!" }),
  city: zod.string().min(1, { message: "City is required!" }),
  role: zod.string().min(1, { message: "Role is required!" }),
  zipCode: zod.string().min(1, { message: "Zip code is required!" }),
  // Not required
  status: zod.string(),
  isVerified: zod.boolean(),
});

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

export function UserForm({ currentUser }: Props) {
  const router = useRouter();

  const defaultValues: Omit<
    IUser,
    "phoneNumber" | "profilePicture" | "name" | "id" | "createdAt" | "updatedAt"
  > & {
    phoneNumber: string;
  } = {
    password: "",
    isActive: false,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    address: "",
    zipCode: "",
    role: RoleEnum.USER, // Default role
    gender: GenderEnum.NA,
    authProvider: AuthProviderEnum.CUSTOM, // Default auth provider
    elrollIds: [],
  };

  const methods = useForm<UserSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(UserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentUser) {
      methods.reset({
        avatarUrl: currentUser.profilePicture || "",
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber?.number || "",
        country: currentUser.country || "",
        gender: currentUser.gender || "",
        address: currentUser.address || "",
        company: currentUser.company || "",
        state: currentUser.state || "",
        city: currentUser.city || "",
        zipCode: currentUser.zipCode || "",
        role: currentUser.role,
        status: currentUser.isActive ? "active" : "banned",
        isVerified: currentUser.isVerified,
      });
    }
  }, [currentUser, methods]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentUser ? "Update success!" : "Create success!");
      router.push(paths.dashboard.user.list);
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Box
          sx={{
            rowGap: 3,
            columnGap: 2,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(3, 1fr)",
            },
          }}
        >
          <Field.Text name="firstName" label="First name" />
          <Field.Text name="lastName" label="Last name" />
          <Field.Text name="email" label="Email address" />
          <Field.Phone
            name="phoneNumber"
            label="Phone number"
            country={!currentUser ? "DE" : undefined}
          />

          <Field.CountrySelect
            fullWidth
            name="country"
            label="Country"
            placeholder="Choose a country"
          />

          <Field.Select name="role" label="Role">
            {Object.values(RoleEnum).map((userRole) => (
              <MenuItem key={userRole} value={userRole}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Select name="gender" label="Sex">
            {Object.values(GenderEnum).map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.DatePicker name="dob" label="Date of birth" />

          <Field.Text name="state" label="State/region" />
          <Field.Text name="city" label="City" />
          <Field.Text name="address" label="Address" />
          <Field.Text name="zipCode" label="Zip/code" />
          <FormControlLabel
            labelPlacement="start"
            control={
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    checked={field.value !== "active"}
                    onChange={(event) =>
                      field.onChange(event.target.checked ? "banned" : "active")
                    }
                  />
                )}
              />
            }
            label={
              <>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Status
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Apply to activate/deactivate this user
                </Typography>
              </>
            }
            sx={{
              mx: 0,
              mb: 3,
              width: 1,
              justifyContent: "space-between",
            }}
          />
        </Box>

        <Stack sx={{ mt: 3, alignItems: "flex-end" }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {!currentUser ? "Create user" : "Save changes"}
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
