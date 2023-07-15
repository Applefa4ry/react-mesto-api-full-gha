import React from "react";

function SignForm({title, onSubmit, id, buttonText}){

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  return(
    <div className="sign">
      <h2 className="sign__title">{title}</h2>
      <form onSubmit={(e) => onSubmit(e, formValue, setFormValue)} name={id} className="sign__form" noValidate>
        <input value={formValue.email || ""} onChange={handleChange} id="edit-email" minLength="2" maxLength="40" required placeholder="Email" name="email" className="sign__field" type="text" />
        <span className="sign__error edit-email-error"></span>
        <input value={formValue.password || ""} onChange={handleChange} id="edit-password" minLength="2" maxLength="200" required placeholder="Пароль" name="password" className="sign__field" type="password" />
        <span className="sign__error edit-password-error"></span>
        <button type="submit" className="sign__button-submit">{buttonText}</button>
      </form>
    </div>
  )
}

export default SignForm