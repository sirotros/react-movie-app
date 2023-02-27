import Card from "components/Card/Card";
import Button from "components/Button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MovieCard({ id, title, overview, imgUrl, className, onClick }) {
    const { t } = useTranslation()

    return (
        <Card
            title={title} overview={overview} imgUrl={imgUrl} className={className} onClick={onClick}
        >
            <Link to={`/detail/${id}`} className="text-white card-btn"> <Button className="full">{t("ShowMore")}</Button> </Link>
        </Card>
    );
};
