import "scss/page/Home.scss"
import RequestManager from "api";
import Card from "components/Card/Card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [nowPlayings, setNowPlayings] = useState();
  const { t, i18n } = useTranslation();
  const request = RequestManager();
  const [pages, setPages] = useState(1);
  useEffect(() => {
    request.nowPlaying(pages).then((response) => setNowPlayings(response.data));
  }, [pages, i18n.language]);

  const handleChange = (e) => {
    setPages(e.selected + 1)
  }


  return (
    <section>
      <h3 className="text-center mt-4">{t("NowPlaying")}</h3>
      <div className="d-flex flex-wrap">
        {nowPlayings ? (
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
        ) : (
          <>Loading ...</>
        )}
      </div>
      {
        nowPlayings && (
          <div className="paginationBar">
            <ReactPaginate
              className="pagination"
              pageClassName="page-item page-link"
              activeClassName=" active "
              breakLabel="..."
              breakClassName="page-item page-link"
              previousLabel="< previous"
              previousClassName="page-item page-link"
              nextLabel="next >"
              nextClassName="page-item page-link"
              onPageChange={handleChange}
              pageRangeDisplayed={5}
              pageCount={nowPlayings.total_pages}
            />
          </div>
        )
      }

    </section>
  );
}
