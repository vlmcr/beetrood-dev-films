import React, {Component} from "react"
import _orderBy from "lodash/orderBy"
import FilmsList from "./films"
import FilmForm from "./forms/FilmForm"
import TopNavigation from "./TopNavigation"
import FilmContext from "./context/FilmContext"
import api from '../api'
import {find} from "lodash/collection";

export class FilmsPage extends Component {
  state = {
    films: [],
    selectedFilm: {},
    loading: true,
  }

  componentDidMount() {
    api.films.fetchAll().then(
      films => this.setState({films: this.sortFilms(films), loading: false})
    )
  }

  sortFilms = films => _orderBy(films, ["featured", "title"], ["desc", "asc"])

  toggleFeatured = id => e => {
      const film = find(this.state.films, {_id: id})
      return this.updateFilm({...film, featured: !film.featured})
  }

  deleteFilm = film =>
    api.films.delete(film).then(() =>
      this.setState(({items}) => ({
        items: this.sortFilms(items.filter(item => item._id !== film._id)),
      })),
  )


  saveFilm = film =>
    film._id === null ? this.addFilm(film) : this.updateFilm(film)

  addFilm = film =>
      api.films.create(film).then(film => {
          this.setState(({films}) => ({
              films: this.sortFilms([...films, {...film}])
          }))
      })


  updateFilm = film =>
      api.films.update(film).then(film => {
          this.setState(({films}) => ({
            films: this.sortFilms(films.map(f => (f._id === film._id ? film : f))),
          }))
      })

  selectFilmForEdit = selectedFilm => () =>
    this.setState({
      selectedFilm,
    })

  deleteFilm = film => e =>
    this.setState(({films}) => ({
      films: this.sortFilms(films.filter(f => f._id !== film._id)),
      selectedFilm: {}
    }))

  render() {
    const {films, selectedFilm} = this.state;
    const numCol = this.props.location.pathname === "/films" ? "sixteen" : "ten";

    return (
      <FilmContext.Provider
        value={{
          toggleFeatured: this.toggleFeatured,
          selectFilmForEdit: this.selectFilmForEdit,
          deleteFilm: this.deleteFilm,
        }}
      >
        <div className="ui stackable grid">


          <div className={`${numCol} wide column`}>
            {
              this.state.loading ? (
                <div className="ui icon message">
                  <i className="notched circle loading icon" />
                  <div className="content">
                    <div className="header">films loading</div>
                  </div>
                </div>
              ) : (
                <FilmsList films={films} />
              )
            }
          </div>
        </div>

      </FilmContext.Provider>
    )
  }
}

export default FilmsPage;
