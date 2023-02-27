import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "components/Spinner/Spinner";
import MovieCard from "components/MovieCard/MovieCard";
import requestManager from "api";
import { changeTitle } from "utils";

export default function TopRated() {
    const [isLoading, setIsLoading] = useState(true)

    const { t, i18n } = useTranslation()
    const request = requestManager()
    const [topRated, setTopRated] = useState()
    
    useEffect(() => {
        request.topRatedMovies().then((response) => {
            setTopRated(response.data.results)
            setIsLoading(false)
        })
        changeTitle(t("TopRatedMovies"))
    }, [i18n.language])

    return (
        <section >
            <h2 className="text-center"> {t("TopRatedMovies")} </h2>
            <div className="d-flex flex-wrap ">
                {!isLoading ?
                    topRated && topRated.map((topRate) => {
                        return <MovieCard id={topRate.id} title={topRate?.title} overview={topRate?.overview} imgUrl={topRate?.poster_path} key={topRate.id} />
                    })
                    : <Spinner />
                }
            </div>
        </section>
    );
};

