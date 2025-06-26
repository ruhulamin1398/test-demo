import { z as zod } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  isValidPhoneNumber,
  parsePhoneNumber,
  PhoneNumber,
} from "react-phone-number-input/input";

import LoadingButton from "@mui/lab/LoadingButton";

import { toast } from "@/components/snackbar";
import { Form, Field, schemaHelper } from "@/components/hook-form";

import { ProfileSecurityTab } from "./profile-security-tab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  FormControlLabel,
  MenuItem,
  Switch,
  Typography,
  Box,
  Card,
  Grid2 as Grid,
  Stack,
} from "@mui/material";
import { GenderEnum, IPhoneNumber, IUser, RoleEnum } from "@/interfaces";
import { LocalizationProvider } from "@/locales";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ProfileAccountTabProfileImage from "../profile-account-tab-profileImage";
import { GET_USER_QUERY, UPDATE_USER_MUTATION } from "@/graphql-client/user";
import dayjs from "dayjs";
import { handleGraphQLError } from "@/utils/errorHandling";

// ----------------------------------------------------------------------
export type UserSchemaType = zod.infer<typeof UserSchema>;

export const UserSchema = zod.object({
  firstName: zod.string().min(1, { message: "Name is required!" }),
  lastName: zod.string().min(1, { message: "Name is required!" }),
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
  address: zod.string().nullable().optional(),
  state: zod.string().nullable().optional(),
  city: zod.string().nullable().optional(),
  role: zod.string().min(1, { message: "Role is required!" }),
  zipCode: zod.string().nullable().optional(),
  isActive: zod.boolean(),
  dob: zod
    .any()
    .nullable()
    .refine(
      (val) => {
        const parsed = dayjs(val);
        return val !== null && parsed.isValid();
      },
      {
        message: "Date of birth and must be valid",
      }
    ),
});

// ----------------------------------------------------------------------

const defaultValues: UserSchemaType = {
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
  dob: null,
};

const ProfileAccountTab = () => {
  const [updateGeneralInfo, { loading }] = useMutation(UPDATE_USER_MUTATION);
  const loggedUser = useSelector((state: RootState) => state.auth?.user);
  const [user, setUser] = useState<IUser | null>(null);

  const {
    data,
    loading: getUserLoading,
    error,
  } = useQuery(GET_USER_QUERY, {
    variables: { id: loggedUser?.id },
    skip: !loggedUser?.id, // Skip the query if `id` is not present
  });

  const methods = useForm<UserSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(UserSchema),
    defaultValues,
  });

  const { reset, watch, control, handleSubmit, formState } = methods;

  useEffect(() => {
    if (user) {
      console.log(dayjs(Number(user.dob)).format("YYYY-MM-DD"));
      const dob = user.dob ? dayjs(Number(user.dob)) : null;
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber?.number || "",
        country: user.country || "",
        gender: user.gender || GenderEnum.NA,
        address: user.address || "",
        state: user.state || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
        role: user.role || RoleEnum.USER,
        isActive: user.isActive || false,
        dob: dob,
      });
    }
  }, [user, methods]);

  useEffect(() => {
    if (data && data.getUser) {
      setUser(data.getUser);
    }
  }, [data]);

  const onSubmit = handleSubmit(async (data) => {
    if (formState.isSubmitting) return;
    const { phoneNumber, ...restData } = data;
    const { countryCallingCode, number } = parsePhoneNumber(
      phoneNumber
    ) as PhoneNumber;
    const payload = {
      id: user?.id,
      input: {
        phoneNumber: { countryCode: countryCallingCode, number },
        ...restData,
      },
    };
    // await updateGeneralInfo({ variables: payload });
    toast.promise(
      updateGeneralInfo({ variables: payload }).then((res) => res.data),
      {
        loading: "Updating user information...",
        success: () => `User has been updated`,
        error: (err) => {
          return handleGraphQLError(err);
        },
      }
    );
  });

  return (
    <>
      <LocalizationProvider>
        <Grid container spacing={3}>
          <ProfileAccountTabProfileImage />

          <Grid size={{ xs: 12, md: 8 }}>
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
                    country={!user ? "BD" : undefined}
                  />

                  <Field.CountrySelect
                    fullWidth
                    name="country"
                    label="Country"
                    placeholder="Choose a country"
                  />

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
                        name="isActive"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            {...field}
                            checked={field.value}
                            onChange={(event) =>
                              field.onChange(event.target.checked)
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
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Apply to activate/deactivate me
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
                    loading={loading}
                  >
                    Save changes
                  </LoadingButton>
                </Stack>
              </Card>
            </Form>
          </Grid>
        </Grid>
      </LocalizationProvider>
      <ProfileSecurityTab />
    </>
  );
};

export default ProfileAccountTab;
