"use client";

import { number, z as zod } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { Form, Field } from "@/components/hook-form";

// import { signUp } from '../context/jwt';
// import { useAuthContext } from '../hooks';
import { getErrorMessage } from "../utils";
import { FormHead } from "../components/form-head";
import { SignUpTerms } from "../components/sign-up-terms";
import { FormSocials } from "../components/form-socials";
import { FormDivider } from "../components/form-divider";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/graphql-client/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { IUser } from "@/interfaces";
import { count } from "console";
import { signIn } from "next-auth/react";

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: "First name is required!" }),
  lastName: zod.string().min(1, { message: "Last name is required!" }),
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  phone: zod.string(),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

interface RegisterResponse {
  register: {
    token: string;
    user: IUser;
  };
}

// ----------------------------------------------------------------------

export function SignUpView() {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const [register, { data, loading, error }] =
  //   useMutation<RegisterResponse>(REGISTER_MUTATION);

  // useEffect(() => {
  //   if (data?.register?.user) {
  //     const user = data.register.user;
  //     dispatch(setUser(user)); // Assuming you use Redux to manage user state
  //     router.push("/");
  //   }
  //   console.log("Hello Nizam inside useeffect", error);
  // }, [data, error, dispatch, router]);

  const showPassword = useBoolean();

  // const { checkUserSession } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultValues: SignUpSchemaType = {
    firstName: "Hello",
    lastName: "Friend",
    email: "hello@gmail.com",
    phone: "+8801000000000",
    password: "@2Minimal",
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      const { firstName, lastName, email, phone, password } = data;
      const result = await signIn("credentials", {
        redirect: true,
        firstName,
        lastName,
        email,
        phone,
        password,
        callbackUrl: "/",
        requestType: "register",
      });

      if (result?.error) {
        console.error("Registration error:", result.error);
        setErrorMessage(result.error);
      } else {
        console.log("Registration and login successful:", result);
        router.push("/");
      }
      // await register({
      //   variables: {
      //     name: firstName,
      //     firstName,
      //     email,
      //     phoneNumber: { number: phone, countryCode: "+880" },
      //     password,
      //     lastName,
      //   },
      // });
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  // @TODO: make this workable with the backend

  const renderForm = () => (
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 3, sm: 2 },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Field.Text
          name="firstName"
          label="First name"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Field.Text
          name="lastName"
          label="Last name"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>

      <Field.Text
        name="phone"
        label="Phone"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Field.Text
        name="email"
        label="Email address"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={showPassword.value ? "text" : "password"}
        slotProps={{
          inputLabel: { shrink: true },
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
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Create account..."
      >
        Create account
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Get started absolutely free"
        description={
          <>
            {`Already have an account? `}
            <Link
              component={RouterLink}
              href={paths.auth.nextAuth.signIn}
              variant="subtitle2"
            >
              Log in now
            </Link>
          </>
        }
        sx={{ textAlign: { xs: "center", md: "left" } }}
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <SignUpTerms />
      <FormDivider />
      <FormSocials />
    </>
  );
}
