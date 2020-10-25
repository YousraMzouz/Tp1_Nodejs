import React from "react";
import { Link } from "react-router-dom"; //on l'utilise ds une fct au lieu d'utiliser router
import AuthOptions from "../auth/AuthOptions";

export default function Header() {
  return (
    <header id="header">                             {/*on le donne un id pour qu'on puisse manipuler son style css par la suite */}
      <Link to="/">                                  {/* qu'on on clique on se dirige a la page home de l'app*/}
        <h1 className="title" >    MERN Web Application </h1>  {/* on le donne id qui est la class Name pr manipuler le css apres */}
      </Link>
      <AuthOptions />                                  {/* c'est bcp mieux de séparer les composantes que de écrir tt ds un seul fichier*/}
    </header>
  );
}