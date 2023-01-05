import { useState } from "react";
import { 
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth 
} from "../../utils/firebase/firebase.utils";

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
    <div>
      <h1>Sign up with your email and password.</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type='text' 
          placeholder='Name' 
          name='displayName'
          onChange={handleChange}
          value={displayName}
          required
        />

        <label>Email</label>
        <input 
          type='email' 
          placeholder='Email'
          name='email'
          onChange={handleChange}
          value={email}
          required
        />

        <label>Password</label>
        <input 
          type='password' 
          placeholder='Password' 
          name='password'
          onChange={handleChange}
          value={password}
          required
        />

        <label>Confirm Password</label>
        <input 
          type='password' 
          placeholder='Confirm Password' 
          name='confirmPassword'
          onChange={handleChange}
          value={confirmPassword}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
} 

export default SignUpForm;