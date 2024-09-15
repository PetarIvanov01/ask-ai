import { register } from "./register-action";

import AuthForm from "../form";

export default function SignUpPage() {
  return <AuthForm type={"register"} action={register} />;
}
