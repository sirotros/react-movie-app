import Card from "components/Card/Card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import requestManager from "api";
import Spinner from "components/Spinner/Spinner";
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
    }, [i18n.language])
    console.log(popularData)
    return (
        <section className="d-flex">
            {
                !isLoading ?
                    popularData && popularData.map((popular) => {
                        return <Card id={popular.id} title={popular?.title} overview={popular?.overview} imgUrl={popular?.poster_path} key={popular.id} />
                    })
                    : <Spinner />
            }
        </section>
    );
};
export default Popular;