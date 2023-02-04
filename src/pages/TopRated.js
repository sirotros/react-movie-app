import { useEffect, useState } from "react";
import Card from "components/Card/Card";
import { useTranslation } from "react-i18next";
import requestManager from "api";
import Spinner from "components/Spinner/Spinner";

export default function TopRated() {
    const [isLoading, setIsLoading] = useState(true)

    const { i18n } = useTranslation()
    const request = requestManager()
    const [topRated, setTopRated] = useState()
    useEffect(() => {
        request.topRatedMovies().then((response) => {
            setTopRated(response.data.results)
            setIsLoading(false)
        })
    }, [i18n.language])
    return (
        <section className="d-flex flex-wrap">
            {!isLoading ?
                topRated && topRated.map((topRate) => {
                    return <Card id={topRate.id} title={topRate?.title} overview={topRate?.overview} imgUrl={topRate?.poster_path} key={topRate.id} />
                })
                : <Spinner />
            }
        </section>
    );
};

