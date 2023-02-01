import "./Header.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLanguage, FaSearch } from "react-icons/fa";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import requestManager from "api";
import { useTranslation } from "react-i18next";


export default function Header() {
  const request = requestManager();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [movieNames, setMovieNames] = useState([]);

  const { t, i18n } = useTranslation()


  useEffect(() => {
    if (searchText.length < 1) {
      setMovieNames([]);
    } else {
      request.search(searchText).then((response) => {
        setMovieNames(response.data.results);
      });
    }
  }, [searchText]);
  return (
    <>
      <header className="d-flex align-items-center justify-content-around">
        <Link to="/" className="text-decoration-none ">
          {t("Home")}
        </Link>
        <Link to="/popular" className="text-decoration-none ">
          {t("PopularMovies")}
        </Link>
        <Link to="/top_rated" className="text-decoration-none ">
          {t("TopRatedMovies")}
        </Link>
        <Button
          variant="link"
          className="text-dark"
          onClick={() => setShowSearch(!showSearch)}
        >
          <FaSearch />
        </Button>
        <div className="dropdown ">
          <button
            className="btn btn-link text-dark dropdown-toggle "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaLanguage />
          </button>
          <ul className="dropdown-menu">
            <li className={`px-3 lang ${i18n.language == "tr-TR" && "bg-success"}`} onClick={() => i18n.changeLanguage("tr-TR")}>Tr</li>
            <li className={`px-3 lang ${i18n.language == "en-US" && "bg-success"}`} onClick={() => i18n.changeLanguage("en-US")}>En</li>
          </ul>
        </div>
      </header>
      {showSearch && (
        <Input
          placeholder={t("Placeholder")}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      {movieNames.length > 0 ? (
        <ul className="list-group">
          {movieNames.map((moviName, index) => {
            return (
              <li key={index} className="list-group-item">
                <Link
                  to={`/detail/${moviName.id}`}
                  onClick={() => {
                    setShowSearch(false)
                    setMovieNames("")
                  }}
                >
                  {moviName.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
