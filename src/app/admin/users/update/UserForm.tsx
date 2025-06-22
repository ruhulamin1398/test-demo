import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  isValidPhoneNumber,
  parsePhoneNumber,
  PhoneNumber,
} from "react-phone-number-input/input";
import dayjs from "dayjs";
import {
  Box,
  Card,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { handleGraphQLError } from "@/utils/errorHandling";

import { toast } from "src/components/snackbar";
import { Form, Field, schemaHelper } from "src/components/hook-form";
import { MenuItem } from "@mui/material";
import { GenderEnum, IUser, RoleEnum } from "@/interfaces";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/graphql-client/user";

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

type Props = {
  currentUser?: IUser;
};

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

export function UserForm({ currentUser }: Props) {
  const [updateGeneralInfo, { loading }] = useMutation(UPDATE_USER_MUTATION);

  const methods = useForm<UserSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(UserSchema),
    defaultValues,
  });

  const { reset, watch, control, handleSubmit, formState } = methods;

  const values = watch();

  useEffect(() => {
    if (currentUser) {
      console.log(dayjs(Number(currentUser.dob)).format("YYYY-MM-DD"));
      const dob = currentUser.dob ? dayjs(Number(currentUser.dob)) : null;
      reset({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber?.number || "",
        country: currentUser.country || "",
        gender: currentUser.gender || GenderEnum.NA,
        address: currentUser.address || "",
        state: currentUser.state || "",
        city: currentUser.city || "",
        zipCode: currentUser.zipCode || "",
        role: currentUser.role || RoleEnum.USER,
        isActive: currentUser.isActive || false,
        dob: dob,
      });
    }
  }, [currentUser, methods]);

  const onSubmit = handleSubmit(async (data) => {
    if (formState.isSubmitting) return;
    const { phoneNumber, ...restData } = data;
    const { countryCallingCode, number } = parsePhoneNumber(
      phoneNumber
    ) as PhoneNumber;
    const payload = {
      id: currentUser?.id,
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
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
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
          <LoadingButton type="submit" variant="contained" loading={loading}>
            Save changes
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
