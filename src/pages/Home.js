import "scss/page/Home.scss"
import requestManager from "api";
import Card from "components/Card/Card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import Spinner from "components/Spinner/Spinner";
import { changeTitle } from "utils";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [nowPlayings, setNowPlayings] = useState();
  const { t, i18n } = useTranslation();
  const request = requestManager();
  const [pages, setPages] = useState(1);
  useEffect(() => {
    request.nowPlaying(pages).then((response) => {
      setNowPlayings(response.data);
      setIsLoading(false)
    });
    changeTitle(t("NowPlaying"))
  }, [pages, i18n.language]);

  const handleChange = (e) => {
    setPages(e.selected + 1)
  }

  return (
    <section>
      <h3 className="text-center mt-4">{t("NowPlaying")}</h3>
      <div className="d-flex flex-wrap ">
        {!isLoading ? (
          <>
            {nowPlayings.results.map((nowPlaying) => {
              return (
                <Card
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
      {
        nowPlayings && (
          <div className="paginationBar ">
            <ReactPaginate
              className="pagination"
              pageClassName="page-item page-link "
              activeClassName="active"
              breakLabel="..."
              breakClassName="page-item page-link"
              previousLabel="<"
              previousClassName="page-item page-link"
              nextLabel=">"
              nextClassName="page-item page-link"
              onPageChange={handleChange}
              pageRangeDisplayed={2}
              pageCount={nowPlayings.total_pages}
            />
          </div>
        )
      }

    </section>
  );
}
