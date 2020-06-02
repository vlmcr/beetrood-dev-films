import React, {useContext} from 'react';
import FilmContext from "./context/FilmContext";
import Route from "react-router-dom/es/Route";

function AdminRoute({render, path}) {
  const {user} = useContext(FilmContext)

  return user.role === "admin" && <Route path={path} component={render}/>;

}

export default AdminRoute;