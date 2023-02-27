import "./Header.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLanguage, FaCheck } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag"
import requestManager from "api";
import { useTranslation } from "react-i18next";
import Input from "components/Input/Input";
import { Collapse } from 'bootstrap';


export default function Header() {
  const request = requestManager();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()
  const key = localStorage.getItem("api_key")

  const removeApiKey = () => {
    localStorage.removeItem("api_key")
    return navigate("api_key")
  }
  useEffect(() => {
    if (searchText.length < 1) {
      setSearchResults([]);
    } else {
      request.search(searchText).then((response) => {
        setSearchResults(response.data.results);
      });
    }
  }, [searchText]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-relative">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/"> {t("Home")} </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/popular">{t("PopularMovies")}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/top_rated">{t("TopRatedMovies")}</Link>
              </li>
              <li className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle " data-bs-toggle="dropdown" >
                  <FaLanguage className="fs-4" />
                </a>
                <ul className="dropdown-menu">
                  <li className="px-3 py-1 lang" onClick={() => i18n.changeLanguage("tr-TR")}> {i18n.language == "tr-TR" ? <FaCheck /> : <ReactCountryFlag countryCode="tr" svg />} Tr</li>
                  <li className="px-3 py-1 lang" onClick={() => i18n.changeLanguage("en-US")}> {i18n.language == "en-US" ? <FaCheck /> : <ReactCountryFlag countryCode="us" svg />} En</li>
                </ul>
              </li>
              {key &&
                <li className="nav-item" onClick={removeApiKey}>
                  <button className="nav-link btn"> {t("LogOut")}</button>
                </li>
              }
            </ul>
            {key &&
              <form className="d-flex" >
                <Input className="me-2" placeholder={t("Placeholder")} onChange={(e) => setSearchText(e.target.value)} />
              </form>
            }

          </div>
        </div>
      </nav>
      {searchResults.length > 0 ? (
        <ul className="list-group ">
          {searchResults.map((moviName, index) => {
            return (
              <li key={index} className="list-group-item">
                <Link
                  to={`/detail/${moviName.id}`}
                  onClick={() => {
                    setSearchResults("")
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

