import { login } from "./login-action";

import AuthForm from "../form";

export default function SignInPage() {
  return <AuthForm type={"login"} action={login} />;
}
