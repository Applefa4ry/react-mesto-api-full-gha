import React from "react";
import SignForm from "./SignForm";
import * as auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login(props){
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e, formValue, setFormValue) => {
    e.preventDefault();
    setIsLoading(true)
    if (!formValue.email || !formValue.password){
      setIsLoading(false)
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((res) => {
        if (res.token){
          props.setEmail(formValue.email)
          setFormValue({email:"", password:""})
          props.handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch(err =>{
        props.openError();
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  return (
    <SignForm title="Вход" buttonText={isLoading?"Вход...":"Войти"} onSubmit={handleSubmit} />
  )
}

export default Login;