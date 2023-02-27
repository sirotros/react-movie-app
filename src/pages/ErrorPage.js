import { useEffect } from "react";
import Error from "components/Error/Error";
import { changeTitle } from "utils";
import { useTranslation } from "react-i18next";
export default function ErrorPage() {
    const { t } = useTranslation()
    useEffect(() => {
        changeTitle(t("ErrorMessage"))
    }, [])
    return (
        <>
            <Error />
        </>
    );
};