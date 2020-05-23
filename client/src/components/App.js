import React, {Component} from "react"
import axios from "axios"
import _orderBy from "lodash/orderBy"
import {generate as id} from "shortid"
import FilmsList from "./films"
import FilmForm from "./forms/FilmForm"
import TopNavigation from "./TopNavigation"
import FilmContext from "./context/FilmContext"
import api from '../api'

export class App extends Component {
  state = {
    films: [],
    showAddForm: false,
    selectedFilm: {},
  }

  componentDidMount() {
        api.films.fetchAll().then(films => this.setState({films: this.sortFilms(films)}))
    }

  sortFilms = films => _orderBy(films, ["featured", "title"], ["desc", "asc"])

  toggleFeatured = id => e =>
    this.setState(({films}) => ({
      films: this.sortFilms(
        films.map(film =>
          film._id === id ? {...film, featured: !film.featured} : film,
        ),
      ),
    }))

  saveFilm = film =>
    film._id === null ? this.addFilm(film) : this.updateFilm(film)

  addFilm = film =>
      api.films.create(film).then(film => {
          this.setState(({films}) => ({
              films: this.sortFilms([...films, {...film}]),
              showAddForm: false,
          }))
      })


  updateFilm = film =>
    this.setState(({films, showAddForm}) => ({
      films: this.sortFilms(films.map(f => (f._id === film._id ? film : f))),
      showAddForm: false,
    }))

  showForm = () => this.setState({showAddForm: true, selectedFilm: {}})

  hideForm = () => this.setState({showAddForm: false, selectedFilm: {}})

  selectFilmForEdit = selectedFilm => () =>
    this.setState({
      selectedFilm,
      showAddForm: true,
    })

  deleteFilm = film => e =>
    this.setState(({films, selectedFilm, showAddForm}) => ({
      films: this.sortFilms(films.filter(f => f._id !== film._id)),
      selectedFilm: {},
      showAddForm: false,
    }))

  render() {
    const {films, showAddForm, selectedFilm} = this.state
    const cols = showAddForm ? "ten" : "sixteen"
    return (
      <FilmContext.Provider
        value={{
          toggleFeatured: this.toggleFeatured,
          selectFilmForEdit: this.selectFilmForEdit,
          deleteFilm: this.deleteFilm,
        }}
      >
        <div className="ui container pt-3">
          <TopNavigation showForm={this.showForm} />

          <div className="ui stackable grid">
            {showAddForm && (
              <div className="six wide column">
                <FilmForm
                  hideForm={this.hideForm}
                  saveFilm={this.saveFilm}
                  film={selectedFilm}
                />
              </div>
            )}

            <div className={`${cols} wide column`}>
              <FilmsList films={films} />
            </div>
          </div>
        </div>
      </FilmContext.Provider>
    )
  }
}

export default App
