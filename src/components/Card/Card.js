import "./Card.scss";
import Button from "components/Button/Button";

import { movieImgURL } from "utils/config";
import { Link } from "react-router-dom";
import defaultImg from "assets/Avatar.svg"
import { useTranslation } from "react-i18next";

export default function Card({ id, profileId, title, overview, imgUrl, className, onClick }) {
    const shortTitle = title && title.slice(0, 20) || "";
    const shortOverview = overview && overview.slice(0, 150) || "";
    const renderClassName = `card d-flex mx-auto position-relative flex-column text-decoration-none ${className}`
    const { t } = useTranslation()
    return (
        <div className={renderClassName} data-aos="fade-up" onClick={onClick}>
            <div className='imgContainer'>
                {imgUrl ? <img src={movieImgURL + imgUrl} alt="actor name" /> : <img src={defaultImg} alt="actor name" />}
            </div>
            <div className="content">
                <h4 className="text-center">{shortTitle}</h4>
                {overview && <p> {shortOverview}...</p>}
            </div>
            {id && <Link to={`/detail/${id}`} className="text-white card-btn"> <Button className="full">{t("ShowMore")}</Button> </Link>}
            {profileId && <Link to={`/profile/${profileId}`} className="text-white card-btn"> <Button className="full">{t("ShowProfile")}</Button> </Link>}
        </div>
    );
};

