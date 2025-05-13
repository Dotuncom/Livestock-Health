//src/Pages/SignUp.jsx
import SignUpForm from "../components/SignUpForm";
import SignupWrapper from "../utils/SignupWrapper";
function SignUp() {
  const xml = (
    <SignupWrapper>
      <SignUpForm />
    </SignupWrapper>
  );
  return xml;
}

export default SignUp;
