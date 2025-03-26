"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import FormField from "@/components/molecules/FormField";
import FormButton from "@/components/molecules/FormButton";
import { validateLogin, validateRegistration } from "@/utils/validation";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/graphql-client/auth";
import { useRouter } from "next/navigation";
import RegistrationForm from "./RegistrationForm";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { IUser } from "@/interfaces";
import useNotification from "@/app/hooks/useNotification";
import { handleGraphQLError } from "@/utils/errorHandling";

// Define the expected response from mutations
interface LoginResponse {
  login: {
    user: IUser;
  };
}

interface RegisterResponse {
  register: {
    token: string;
    user: {
      id: string;
      email: string;
    };
  };
}

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { notify } = useNotification();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const [login, { data, error, loading }] =
    useMutation<LoginResponse>(LOGIN_MUTATION);
  const [register] = useMutation<RegisterResponse>(REGISTER_MUTATION);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({}); // Reset errors
    const validationErrors = validateLogin(email, password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await login({
      variables: { name: email, password },
    });
  };

  useEffect(() => {
    if (data?.login?.user) {
      const user = data.login.user;
      notify({ severity: "success", message: "Successfully logged in!" });
      dispatch(setUser(user)); // Assuming you use Redux to manage user state
      router.push("/");
    }

    if (error) {
      notify({ severity: "error", message: handleGraphQLError(error) });
    }
    console.log("Hello Nizam inside useeffect", error);
  }, [data, error, dispatch, router]);

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Email"
        name="email"
        type="text"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        error={errors.email}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        error={errors.password}
      />
      {type === "register" && <RegistrationForm />}

      <FormButton
        text={type === "register" ? "Register" : "Login"}
        onClick={() => {}}
        disabled={loading}
      />
    </form>
  );
};

export default AuthForm;
