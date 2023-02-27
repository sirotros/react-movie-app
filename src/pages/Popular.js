import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import requestManager from "api";
import Spinner from "components/Spinner/Spinner";
import { changeTitle } from "utils";
import MovieCard from "components/MovieCard/MovieCard";
function Popular() {
    const [isLoading, setIsLoading] = useState(true)

    const { t, i18n } = useTranslation()
    const request = requestManager()
    const [popularData, setPopularData] = useState()
    
    useEffect(() => {
        request.popularMovies().then((response) => {
            setPopularData(response.data.results)
            setIsLoading(false)
        })
        changeTitle(t("PopularMovies"))
    }, [i18n.language])

    return (
        <section>
            <h4 className="text-center"> {t("PopularMovies")} </h4>
            <div className="d-flex flex-wrap">

                {!isLoading ? (
                    <>
                        {popularData && popularData.map((nowPlaying) => {
                            return (
                                <MovieCard
                                    id={nowPlaying.id}
                                    title={nowPlaying?.title}
                                    overview={nowPlaying?.overview}
                                    imgUrl={nowPlaying?.poster_path}
                                    key={nowPlaying.id}
                                />
                            );
                        })}
                    </>
                ) : <Spinner />}
            </div>
        </section>
    );
};
export default Popular;