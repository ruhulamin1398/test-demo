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
import { useSession } from "next-auth/react";

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

// ----------------------------------------------------------------------

export function SignInView() {
  const { notify } = useNotification();

  const { data: session, status } = useSession();
  const [login, { data, error, loading }] =
    useMutation<LoginResponse>(LOGIN_MUTATION);
  const router = useRouter();
  const dispatch = useDispatch();

  const showPassword = useBoolean();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultValues: SignInSchemaType = {
    email: "demo@minimals.cc",
    password: "123456",
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
    console.log("handle submit data", data);
    await login({
      variables: { name: "RuhulAmin", password },
    });
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // const sessionUser = session.user;
      // dispatch(setUser(sessionUser)); // ✅ Set user in Redux
      // router.push("/admin/dashboard"); // ✅ Redirect user
    }
  }, [session, status, dispatch, router]);

  useEffect(() => {
    if (data?.login?.user) {
      const user = data.login.user;
      notify({ severity: "success", message: "Successfully logged in!" });
      dispatch(setUser(user)); // Assuming you use Redux to manage user state
      console.log("logged in user - user pass ", user);

      router.push("/");
    }

    if (error) {
      setErrorMessage(handleGraphQLError(error));
    }
  }, [data, error, dispatch, router, notify]);

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
