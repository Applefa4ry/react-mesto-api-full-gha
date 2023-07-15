import React from "react";
import SignForm from "./SignForm";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth"

function Register(props){
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e, formValue, setFormValue) => {
    e.preventDefault();

    auth.register(formValue.email,formValue.password).then((res) => {
      setIsLoading(true)
      if(res){
        props.handleRegister(true)
        navigate('/sign-in', {replace: true});
      }
      setFormValue({email:"", password:""})
      props.openTooltip();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsLoading(false));
  }
  return (
    <>
      <SignForm title="Регистрация" buttonText={isLoading?"Регистрация...":"Зарегистрироваться"} onSubmit={handleSubmit} />
      <Link className="sign__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
    </>
  )
}

export default Register;