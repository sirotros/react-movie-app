import Card from "components/Card/Card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RequestManager from "api";
function Popular() {
    const { t, i18n } = useTranslation()
    const request = RequestManager()
    const [popularData, setPopularData] = useState()
    useEffect(() => {
        request.popularMovies().then((response) => {
            setPopularData(response.data.results)
        })
    }, [i18n.language])
    console.log(popularData)
    return (
        <section className="d-flex flex-wrap">
            {
                popularData && popularData.map((popular) => {
                    return <Card id={popular.id} title={popular?.title} overview={popular?.overview} imgUrl={popular?.poster_path} key={popular.id} />
                })
            }
        </section>
    );
};
export default Popular;