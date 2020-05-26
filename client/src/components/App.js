import React, {Component} from "react"
import TopNavigation from "./TopNavigation"
import {Route} from "react-router-dom";
import HomePage from "./HomePage";
import {FilmsPage} from "./FilmsPage";

export class App extends Component {
  render() {
    return (
      <div className="ui container pt-3">
        <TopNavigation />

        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route exact path="/films" component={FilmsPage}/>
      </div>
    )
  }
}

export default App
