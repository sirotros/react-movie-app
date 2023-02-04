import "scss/page/ProfileDetail.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import requestManager from "api";
import { movieImgURL } from "utils/config";
import { useTranslation } from "react-i18next";
import Spinner from "components/Spinner/Spinner";
import { changeTitle } from "utils";

export default function ProfileDetail() {
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams();
  const [profile, setProfle] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const request = requestManager();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    request.profileDetail(id).then((response) => {
      setProfle(response.data);
      setIsLoading(false)
    });
    request
      .getProfileImage(id)
      .then((response) => setProfilePhoto(response.data.profiles[0]));

  }, [i18n.language]);

  useEffect(() => {
    changeTitle(profile?.name)
  }, [profile])
  
  return (
    <div>
      {!isLoading ? (
        <>
          <div className="d-flex flex-sm-column flex-md-row">
            <img
              src={movieImgURL + profilePhoto?.file_path}
              alt={profile.name}
              className="profilePhoto"
            />
            <div className="p-md-5 ">
              <h3>{profile.name}</h3>

              <h4> {t("Biography")} </h4>
              <p>
                {profile.biography ? (
                  <>{profile?.biography} </>
                ) : (
                  <p>{t("BiographyErrorMessage")} </p>
                )}
              </p>
            </div>
          </div>
        </>
      ) : <Spinner />}
    </div>
  );
}
