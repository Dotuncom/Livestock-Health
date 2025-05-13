import LoginForm from "../components/LoginForm";
import SignUpWrapper from "../utils/SignupWrapper";
function Login() {
  const xml = (
    <SignUpWrapper>
      <LoginForm />
    </SignUpWrapper>
  );
  return xml;
}

export default Login;
