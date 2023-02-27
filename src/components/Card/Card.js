import "./Card.scss";
import { movieImgURL } from "utils/config";
import defaultImg from "assets/Avatar.svg"
import { useTranslation } from "react-i18next";

export default function Card({ title, overview, imgUrl, className, onClick, children }) {
    const shortTitle = title && title.slice(0, 20) || "";
    const shortOverview = overview && overview.slice(0, 150) || "";
    const renderClassName = `card d-flex position-relative flex-column text-decoration-none ${className}`
    const { t } = useTranslation()
    return (
        <div className={renderClassName} data-aos="fade-up" onClick={onClick}>
            <div className='imgContainer'>
                <img src={imgUrl ? movieImgURL + imgUrl : defaultImg} alt={title} />
            </div>
            <div className="content">
                <h4 className="text-center">{shortTitle}</h4>
                {overview ? <p> {shortOverview}...</p> : <p> {t("Overview")} </p>}
            </div>
            {children}
        </div>
    );
};

