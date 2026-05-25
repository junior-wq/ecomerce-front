

const Register=() => {
  return (
    <div className="login-page">
      <div className="login-card">
       
        <h2 className="login-title">Seja Bem Vindo</h2>
        <p className="login-subtitle">Tens que te registar para possuir beneficios</p>

        <form className="login-form">
          <FormGroup 
            label='Email'
            labelFor='email' 
            type='email' 
            placeholder='Digite o seu email'/>

          <FormGroup 
            label='Password'
            labelFor='password' 
            type='password' 
            placeholder='Digite o seu password'/>

          <FormGroup 
            label='Confirmaçao'
            labelFor='password' 
            type='password' 
            placeholder='Confirme o seu password'/>

          <div className="form-options">
            <label className="remember">
              <input type="checkbox" /> Lembrar-me
            </label>
          </div>

          <Button label='Login'/>
        </form>

        <DontOrHaveAccount 
          questionlabel='Already have an account'
          linkTo='login'
          linkClickplaceholder='login'/>
      </div>
    </div>
  );
};

export default Register;



import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import Button from '../../components/button/Button';

interface Props {
  label:string
  labelFor:string
  type:string
  placeholder:string
  register: UseFormRegister<LoginFormInputs>;
  name:string;
  error?: string; 
  
}


export const FormGroup = ({label,name,error,register,labelFor,type,placeholder}:Props) => {
  return (
    <div className="form-group">
      <label htmlFor={labelFor}>{label}</label>
      <input
         type={type}
          id={labelFor}
          placeholder={placeholder}
          {...register(name)}
          />
          {error && <p className="error-message">{error}</p>} 
    </div>
  )
}


// import React from 'react'
import { Link } from 'react-router-dom';
import { LoginFormInputs } from '../login/Login';

interface DontOrHaveAccountProps{
  questionlabel:string
  linkTo:string
  linkClickplaceholder:string}

export const DontOrHaveAccount = ({questionlabel,linkTo,linkClickplaceholder}:DontOrHaveAccountProps) => {
  return (
  <>
    <p className="register-text">
      {questionlabel}?{" "}
      <Link to={`/${linkTo}`} className="register-link">{linkClickplaceholder}</Link>
    </p>
  </>
 
  )
}
