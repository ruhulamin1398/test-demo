"use client";

import { z as zod } from "zod";
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

interface LoginResponse {
  login: {
    user: IUser;
  };
}

import { paths } from "@/routes/paths";
import { useRouter } from "next/navigation";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { Form, Field } from "@/components/hook-form";

import { FormHead } from "../components/form-head";
import { LOGIN_MUTATION } from "@/graphql-client/auth";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { IUser } from "@/interfaces";
import { setUser } from "@/store/slices/authSlice";
import { handleGraphQLError } from "@/utils/errorHandling";
import useNotification from "@/app/hooks/useNotification";
import { FormSocials } from "../components/form-socials";
import { FormDivider } from "../components/form-divider";
import { signIn } from "next-auth/react";
import { getCookie } from "minimal-shared/utils";

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;
const emailSchema = zod
  .string()
  .email({ message: "Email must be a valid email address!" });
const phoneNumberSchema = zod.string().refine(
  (val) => {
    // Check if length is 11 and contains only digits
    const isValidLength = val.length === 11;
    const isNumeric = /^\d{11}$/.test(val); // Only digits and exactly 11 digits
    const validPrefix = /^(017|015|016|018|019|013)/.test(val); // Check for valid prefixes

    return isValidLength && isNumeric && validPrefix;
  },
  {
    message: "Invalid phone number.",
  }
);
export const SignInSchema = zod.object({
  email: zod.union([phoneNumberSchema, emailSchema]),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

// ----------------------------------------------------------------------

export function SignInView() {
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const callbackUrl = getCookie<string>("next-auth.callback-url");
  const showPassword = useBoolean();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const defaultValues: SignInSchemaType = {
    email: "hello@gmail.com",
    password: "@2Minimal",
  };
  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setErrorMessage(result.error);
      } else {
        notify({ severity: "success", message: "Successfully logged in!" });
        window.location.href = callbackUrl || "/";
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      <Field.Text
        name="email"
        label="Email address"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Box sx={{ gap: 1.5, display: "flex", flexDirection: "column" }}>
        <Link
          component={RouterLink}
          href="#"
          variant="body2"
          color="inherit"
          sx={{ alignSelf: "flex-end" }}
        >
          Forgot password?
        </Link>

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
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting || loading}
        loadingIndicator="Sign in..."
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link
              component={RouterLink}
              href={paths.auth.nextAuth.register}
              variant="subtitle2"
            >
              Get started
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

      <FormDivider />
      <FormSocials />
    </>
  );
}
