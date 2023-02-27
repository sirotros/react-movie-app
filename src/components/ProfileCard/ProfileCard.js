import Card from "components/Card/Card";
import Button from "components/Button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProfileCard({ profileId, title, imgUrl, className, onClick }) {
    const { t } = useTranslation()
    return (
        <Card
            title={title}
            imgUrl={imgUrl}
            className={className}
            onClick={onClick}
        >
            <Link to={`/profile/${profileId}`} className="text-white card-btn"> <Button className="full">{t("ShowProfile")}</Button> </Link>
        </Card>
    );
};