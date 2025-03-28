import { SignUpView } from "@/auth/view/sign-up-view";
import { AuthSplitLayout } from "@/layouts/auth-split";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <SignUpView />;
}
