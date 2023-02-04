import "scss/page/Detail.scss"
import { useParams } from "react-router-dom";
import requestManager from "api";
import { useEffect, useState } from "react";
import { movieImgURL } from "utils/config";
import Card from "components/Card/Card";
import { useTranslation } from "react-i18next";
import Spinner from "components/Spinner/Spinner";

export default function Detail() {
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams();
  const request = requestManager();
  const [detail, setDetail] = useState();
  const [teams, setTeam] = useState();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    request.detailMovies(id).then((response) => {
      setDetail(response.data);
      setIsLoading(false)
    });
    request.movieTeam(id).then((response) => setTeam(response.data.cast));
  }, [id, i18n.language]);
  return (
    <section className="mt-5">
      {!isLoading ?
        (
          detail ? (
            <>
              <img src={movieImgURL + detail?.backdrop_path} className="mx-auto backdropImg" />

              <h2 className="d-flex align-items-center mt-5 "> {detail.title} </h2>
              <p className="mt-3"> {detail.overview} </p>
              <hr />

              <h3 className="mt-3 ">{t("Genre")}</h3>
              <ul className="d-flex ">
                {detail.genres.map((genre, index) => {
                  return (
                    <li className="badge mx-1 px-2 bg-secondary text-white" key={index}> {genre.name} </li>
                  );
                })}
              </ul>
              <hr />

              <div>
                <h3>{t("Vote")}</h3>
                <div>
                  <span>{t("VoteAverage")} : {detail.vote_average} / 10</span>
                  <span className="mx-3">{t("VoteCount")} : {detail.vote_count} </span>
                </div>
              </div>
              {teams && (
                <>
                  <h2 className="text-center mt-5"> {t("MovieActors")} </h2>
                  <div className="d-flex flex-wrap">
                    {teams.map((team) => {
                      return (
                        <Card
                          key={team.id}
                          title={team.name}
                          imgUrl={team.profile_path}
                          className="sm"
                          profileId={team.id}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </>
          ) :
            <h3 className="text-center"> There is no detailed information about the movie. </h3>
        )
        : <Spinner />}

    </section>
  );
}
