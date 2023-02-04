import "./Header.scss";


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLanguage, FaSearch, FaCheck } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag"

import requestManager from "api";
import { useTranslation } from "react-i18next";

export default function Header() {
  const request = requestManager();
  const [searchText, setSearchText] = useState("");
  const [movieNames, setMovieNames] = useState([]);
  console.log(searchText, movieNames)

  const { t, i18n } = useTranslation();

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
      <nav class="navbar navbar-expand-lg bg-body-tertiary position-relative">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/"> {t("Home")} </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/popular">{t("PopularMovies")}</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/top_rated">{t("TopRatedMovies")}</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaLanguage className="fs-4"/>
                </a>
                <ul class="dropdown-menu">
                  <li className={`px-3 lang`} onClick={() => i18n.changeLanguage("tr-TR")}> {i18n.language == "tr-TR" ? <FaCheck /> : <ReactCountryFlag countryCode="tr" svg />} Tr</li>
                  <li className={`px-3 lang`} onClick={() => i18n.changeLanguage("en-US")}> {i18n.language == "en-US" ? <FaCheck /> : <ReactCountryFlag countryCode="us" svg />} En</li>
                </ul>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder={t("Placeholder")} aria-label="Search" onChange={(e) => setSearchText(e.target.value)} />
            </form>
          </div>
        </div>
      </nav>
      {movieNames.length > 0 ? (
        <ul className="list-group ">
          {movieNames.map((moviName, index) => {
            return (
              <li key={index} className="list-group-item">
                <Link
                  to={`/detail/${moviName.id}`}
                  onClick={() => {
                    setMovieNames("")
                  }}
                >
                  {moviName.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : <p>  {searchText && searchText + " " + t("MovieNotFound")} </p>}
    </>
  );
}

/*
 <header className="navbar d-flex align-items-center justify-content-around">
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
            <li className={`px-3 lang`} onClick={() => i18n.changeLanguage("tr-TR")}>Tr {i18n.language == "tr-TR" && "bg-success"}</li>
            <li className={`px-3 lang`} onClick={() => i18n.changeLanguage("en-US")}>En {i18n.language == "en-US" && "bg-success"}</li>
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
*/