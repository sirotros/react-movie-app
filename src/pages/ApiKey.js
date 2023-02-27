import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLink, AiOutlineLogin } from "react-icons/ai"
import { useTranslation } from "react-i18next";
import { changeTitle, setApiKey, validateApiKey } from "utils";

export default function ApiKey() {
    const navigate = useNavigate()
    const [key, setKey] = useState("")
    const [error, setError] = useState(false)
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await validateApiKey(key)
        if (response) {
            setApiKey(key)
            navigate("/")
            window.location.reload()
        } else {
            setError(true)
            setTimeout(() => setError(false), 3000)
        }
    }
    useEffect(() => {
        changeTitle(t("LoginPage"))
    }, [])
    return (
        <div className="container text-center mt-8">
            {error && (
                <div className="alert alert-danger w-50 mx-auto" role="alert">
                    {t("ApiKeyErrorMessage")}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3 w-50 mx-auto">
                    <input type="text" className="form-control" placeholder={t("ApiPlaceholder")} value={key} onChange={e => setKey(e.target.value)} />
                    <button className="btn btn-outline-secondary" type="submit">
                        <AiOutlineLogin />
                    </button>
                </div>

            </form>
            <p> {t("ApiPageMessage")} <Link to="https://www.themoviedb.org/documentation/api"> <AiOutlineLink /> </Link> </p>
        </div>
    );
};




