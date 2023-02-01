import { useEffect, useState } from "react";
import Card from "components/Card/Card";
import { useTranslation } from "react-i18next";
import RequestManager from "api";

export default function TopRated() {
    const { i18n } = useTranslation()
    const request = RequestManager()
    const [topRated, setTopRated] = useState()
    useEffect(() => {
        request.topRatedMovies().then((response) => {
            setTopRated(response.data.results)
        })
    }, [i18n.language])
    return (
        <section className="d-flex flex-wrap">
            {
                topRated && topRated.map((topRate) => {
                    return <Card id={topRate.id} title={topRate?.title} overview={topRate?.overview} imgUrl={topRate?.poster_path} key={topRate.id} />
                })
            }
        </section>
    );
};
