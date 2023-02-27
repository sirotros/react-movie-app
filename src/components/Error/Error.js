import './Error.scss';
import { useTranslation } from "react-i18next";

export default function Error() {
    const { t } = useTranslation()
    return (
        <div className='error'>
            {t("ErrorMessage")}
        </div>
    );
};