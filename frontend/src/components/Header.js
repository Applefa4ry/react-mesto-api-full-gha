import logoPath from '../images/mesto-logo.svg'
import { useLocation, useNavigate } from 'react-router-dom';

function Header({loggedIn, email, onLogOut}){
  let location = useLocation();
  let navigation = useNavigate();

  function signOut(){
    onLogOut();
    localStorage.removeItem('jwt');
    navigation('/sign-in', {replace: true});
  }

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Mesto" />
      <span className='header__email'>{loggedIn?email:""}</span>
      <button className="header__sign" style={loggedIn?{opacity:0.6}:{}} onClick={loggedIn?signOut:location.pathname === "/sign-in"?() => navigation("/sign-up"):() => navigation("/sign-in")} >{loggedIn?"Выйти":location.pathname === "/sign-in"?"Регистрация":"Войти"}</button>
    </header>
  )
}

export default Header