import React, {useEffect, useState} from "react"
import TopNavigation from "./TopNavigation"
import {Route} from "react-router-dom";
import Film from "./films/Film";
import {Async, lazyImport} from "./Async";
import {setAuthorizationHeader} from "../utils";

import jwtDecode from 'jwt-decode';

const HomePage = Async(lazyImport("./HomePage"));
const FilmsPage = Async(lazyImport("./FilmsPage"));
const SignupPage = Async(lazyImport("./SignupPage"));
const LoginPage = Async(lazyImport("./LoginPage"));

const initialState = {
  token: null,
  role: "user",
}

const App = props =>  {
  const [user, setUser] = useState(initialState)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (localStorage.filmsToken) {
      setUser({
        token: localStorage.filmsToken,
        role: jwtDecode(localStorage.filmsToken).user.role
      })
      setAuthorizationHeader(localStorage.filmsToken)
    }
  }, [])

  const login = token => {
    setUser({
      token,
      role: jwtDecode(token).user.role
    })
    localStorage.filmsToken = token
    setAuthorizationHeader(token)
  }

  const logout = () => {
    setUser({token: null, role: "user"})
    setAuthorizationHeader()
    delete localStorage.filmsToken
  }

  return (
    <div className="ui container pt-3">
      <TopNavigation logout={logout} isAuth={user.token} isAdmin={user.role === "admin"} />

      {message && (
        <div className="ui info message">
          <i className="close icon" onClick={() => setMessage("")} />
          {message}
        </div>
      )}

      <Route exact path="/">
        <HomePage/>
      </Route>

      <Route path="/films" render={props => (
        <FilmsPage {...props} user={user} />
      )} />
      <Route path="/film/:_id" exact component={Film} />

      <Route
        path="/signup"
        render={props => (
          <SignupPage {...props} setMessage={setMessage} />
        )}
      />

      <Route path="/login" exact render={
        props => <LoginPage {...props} login={login}/>
      }/>
    </div>
  )
}

export default App
