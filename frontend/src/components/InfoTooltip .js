import React from "react";
import Pass from "../images/Pass.svg";
import Fail from "../images/Fail.svg";

function InfoTooltip(props){
  return (
    <div className={`popup ${props.isOpen?"popup_opened":"" }`}> 
    <div className={`popup__container popup__sign-container`}>
      <img className="popup__sign-picture" src={props.isRegister?Pass:Fail} alt={props.isRegister?"Pass":"Fail"} />
      <h2>{props.isRegister?"Вы успешно зарегистрировались!":"Что-то пошло не так!\nПопробуйте ещё раз."}</h2>
    </div>
    <button onClick={props.onClose} type="button" className="popup__close"></button>
  </div>
  )
}

export default InfoTooltip;