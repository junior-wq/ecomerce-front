import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email, z } from "zod";
import apiClient from '../../services/api-client'

import { ToastContainer, toast } from 'react-toastify';
import { AxiosError } from "axios";
import { getAuthToken, saveAuthToken } from "../../services/local-storage-servivces";
import { getCurrentUser } from "./userService";
import Button from "../../components/button/Button";
import { FormGroup } from "../register/Register";

type Response={refresh:string,access:string}

// Schema de validação com Zod
export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter ao menos 6 caracteres" }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

type Props = {
  isShow: boolean;
};

const Login = ({isShow}:Props) => {

  const notify = (msg:string) => toast(msg);

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);
   try {
    const res= await  apiClient.post<Response>('/auth/jwt/create',data)
    saveAuthToken(res.data.access)
    const user=await getCurrentUser()
    console.log('usuario buscado com successo', user)
    toast.success('You have succesfull loged in')

    console.log(res.data)
   } catch (err ) {
    const error=err as AxiosError
    console.log('algo inersperado no login',error)
    if (error.status===401) 
      toast.error('Invalid credentials') 
   } 
  
  };

  return (
    <div className={isShow?"login-page":"hide-login-page"}>
      <ToastContainer 
         hideProgressBar={true}
         position="top-center"
         autoClose={1000} />

      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Tens que fazer o login para fazer compras</p>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup 
             error={errors.email?.message}
             register={register } 
             name="email" type="email" 
             placeholder="Digite seu e-mail" 
             label="Email" labelFor="email"/>
        
          <FormGroup 
             error={errors.password?.message}
             register={register } 
             name="password" type="password"
             placeholder="Digite seu password" 
             label="Password" labelFor="password"/>


          <div className="form-options">
            <label className="remember">
              <input type="checkbox" /> Lembrar-me
            </label>
            <a href="#" className="forgot-password">
              Esqueceu a senha?
            </a>
          </div>
          <Button type="submit" label="Entrar" />
        </form>

        <div className="divider">
          <hr />
          {/* <span>ou</span> */}
          <hr />
        </div>
{/* 
        <div className="social-login">
          <Button label="Google" variant="secondary" fullWidth={true} />
          <Button label="Apple" variant="secondary" fullWidth={true} />
        </div> */}

        <p className="register-text">
          Não tem uma conta?{" "}
          <Link to="/register" className="register-link">
            Registrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
