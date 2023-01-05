import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUserIn = async () => {
    const { user } = await signInWithGooglePopup();
    const response = await createUserDocFromAuth(user);
  };

  return (
    <div>
      <div>Sign In</div>
      <button onClick={logGoogleUserIn}>Sign In with Google</button>
      <SignUpForm />
    </div>
  )
}

export default SignIn;