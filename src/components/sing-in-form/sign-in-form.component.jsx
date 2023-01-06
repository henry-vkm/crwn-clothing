import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
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
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);

    } catch(error) {
      // if email doesn't exist
      if (error.code === 'auth/user-not-found') {
        alert('User does not exist!')
      }

      // wrong password
      if (error.code === 'auth/wrong-password') {
        alert('Incorrect Email or Password!')
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
          <Button onClick={signInGoogleUser} buttonType='google'>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;