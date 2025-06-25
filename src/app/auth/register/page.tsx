import SignUpView from "@/auth/view/sign-up-view";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <SignUpView />;
}
