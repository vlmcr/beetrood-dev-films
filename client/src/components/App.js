import React, {Component} from "react"
import TopNavigation from "./TopNavigation"
import {Route} from "react-router-dom";
import HomePage from "./HomePage";
import {FilmsPage} from "./FilmsPage";
import Film from "./films/Film";
import SignupPage from "./SignupPage";

export class App extends Component {

  state = {
    user: {
      token: undefined,
    }
  }

  logout = () => this.setState({user: {token: null}})

  render() {
    return (
      <div className="ui container pt-3">
        <TopNavigation logout={this.logout} isAuth={this.state.user.token} />
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/films" component={FilmsPage} />
        <Route path="/film/:_id" exact component={Film} />
        <Route path="/singup" exact component={SignupPage} />
      </div>
    )
  }
}

export default App
