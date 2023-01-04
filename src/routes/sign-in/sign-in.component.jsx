import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUserIn = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocFromAuth(user);
  };

  return (
    <div>
      <div>Sign In</div>
      <button onClick={logGoogleUserIn}>Sign In with Google</button>
    </div>
  )
}

export default SignIn;