import { useState } from "react";
import { 
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth 
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // Reset form fields to default after submitting
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  // Formfield change handler
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]:value});
  }

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return;
    };

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
    } catch(error) {
      if (error.code === 'auth/email-already-in-use') {
        alert("Email already in use.");
      } else {
        console.log("Error creating user, ", error.message)
      }      
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Do not have an account?</h2>
      <span>Sign up with Email and Password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Name'
          inputOptions = {{
            type:'text', 
            name:'displayName',
            onChange:handleChange,
            value:displayName,
            required:true
          }}
          
        />

        <FormInput 
          label='Email'
          inputOptions={{
            type:'email',
            name:'email',
            onChange:handleChange,
            value:email,
            required:true
          }}
        />

        <FormInput 
          label='Password'
          inputOptions={{
            type:'password',
            name:'password',
            onChange:handleChange,
            value:password,
            required:true
          }}
        />

        <FormInput 
          label='Confirm Password'
          inputOptions={{
            type:'password',
            name:'confirmPassword',
            onChange:handleChange,
            value:confirmPassword,
            required:true
          }}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
} 

export default SignUpForm;