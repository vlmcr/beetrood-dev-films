import _orderBy from "lodash/orderBy"
import FilmsList from "./films"
import FilmForm from "./forms/FilmForm"
import FilmContext from "./context/FilmContext"
import api from '../api'
import React, {useState, useEffect, useMemo, useCallback} from "react";
import AdminRoute from "./AdminRoute";
import {find} from "lodash";
import Spinner from "./Spinner/Spinner";

const sortFilms = films =>
  _orderBy(films, ["featured", "title"], ["desc", "asc"]);

const FilmsPage = props => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.films.fetchAll().then(films => {
      setFilms(sortFilms(films));
      setLoading(false);
    });
  }, []);

  const addFilm = filmData =>
    api.films.create(filmData)
      .then(film => setFilms(films => sortFilms([...films, {...film}])));

  const updateFilm = filmData =>
    api.films.update(filmData)
      .then(film => {
        setFilms(films => sortFilms(films.map(f => (f._id === film._id ? film : f))));
      });

  const saveFilm = film =>
    (film._id ? updateFilm(film) : addFilm(film))
      .then(() => props.history.push("/films"));

  const toggleFeatured = useCallback(
    id => {
      const film = find(films, {_id: id});
      updateFilm({...film, featured: !film.featured});
    },
    [updateFilm],
  );

  const deleteFilm = useCallback(
    film =>
      api.films.delete(film).then(() => {
        setFilms(films => sortFilms(films.filter(f => f._id !== film._id)));
      }),
    [],
  );

  const values = useMemo(
    () => ({
      toggleFeatured,
      deleteFilm,
      user: props.user,
    }),
    [toggleFeatured, deleteFilm],
  );

  const cls = props.location.pathname === "/films" ? "sixteen" : "ten";

  return (
    <FilmContext.Provider value={values}>
      <div className="ui stackable grid">
        <div className="six wide column">
          <AdminRoute path="/films/new"
                      render={() => <FilmForm film={{}} saveFilm={saveFilm} />}
          />
          <AdminRoute   path="/films/edit/:_id"
                        render={({match}) => {
                          const film = find(films, {_id: match.params._id}) || {};
                          return <FilmForm film={film} saveFilm={saveFilm} />;
                        }}
          />
        </div>

        <div className={`${cls} wide column`}>
          {loading ? <Spinner /> : <FilmsList films={films} />}
        </div>
      </div>
    </FilmContext.Provider>
  );
};

export default FilmsPage;