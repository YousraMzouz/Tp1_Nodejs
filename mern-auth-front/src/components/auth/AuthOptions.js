import React, { useContext } from "react";
import { useHistory } from "react-router-dom";            //utilisé pr que le click sur le boutton soit actif
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();                           //history = tt les routes qui s'écrivent dans la barre de recherche

  const register = () => history.push("/register");      //on cree un const register pour détecter la route register
  const login = () => history.push("/login");            //on cree un const register pour détecter la route login
  const logout = () => { 
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">   {/* className comme un id qui va etre exploiter ds le style.css */}
      {userData.user ? (
        <button onClick={logout}>Log out</button>      //si l'utilis est deja login afficher juste logout
      ) : (                                            //sinon afficher login & regist
        <>
          <button onClick={register}>Register</button> {/*on utilise onclick en appelant la variable définit ci-dessus;c'est comme href en HTML */}
          <button onClick={login}>Log in</button>
        </>
      )}
    </nav>
  );
}