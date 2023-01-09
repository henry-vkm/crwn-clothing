import { useContext, useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";
import { 
  signInAuthUserWithEmailAndPassword, 
  signInWithGooglePopup,
  createUserDocFromAuth
} from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email:'',
  password:''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  // Reset form fields to default after submitting
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const response = await createUserDocFromAuth(user);
    console.log(response)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]:value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      resetFormFields();

    } catch(error) {
      switch(error.code) {
        case 'auth/user-not-found':
          alert('User does not exist!');
          break;

        case 'auth/wrong-password':
          alert('Incorrect Email or Password!');
          break;

        default:
          console.log(error);
      }
    }
  }

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with Email and Password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          inputOptions={{
            type:'email',
            name:'email',
            required:true,
            onChange:handleChange,
            value: email
          }}
        />

        <FormInput
          label='Password'
          inputOptions={{
            type:'password',
            name:'password',
            required:true,
            onChange:handleChange,
            value: password
          }}
        />

        <div className='buttonContainer'>
          <Button type='submit'>Log In</Button>
          <Button type='button' onClick={signInGoogleUser} buttonType='google'>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;