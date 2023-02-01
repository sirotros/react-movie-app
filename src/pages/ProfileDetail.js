import "scss/page/ProfileDetail.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RequestManager from "api";
import { movieImgURL } from "utils/config";
import { useTranslation } from "react-i18next";

export default function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfle] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const request = RequestManager();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    request.profileDetail(id).then((response) => setProfle(response.data));
    request
      .getProfileImage(id)
      .then((response) => setProfilePhoto(response.data.profiles[0]));
  }, [i18n.language]);
  console.log(profile);
  return (
    <div>
      {profile && (
        <>
          <div className="d-flex">
            <img
              src={movieImgURL + profilePhoto?.file_path}
              alt={profile.name}
              className="profilePhoto"
            />
            <div className="p-5 ">
              <h3>{profile.name}</h3>

              <h4> {t("Biography")} </h4>
              <p>
                {profile.biography ? (
                  <>{profile.biography} </>
                ) : (
                  <>{t("BiographyMessage")} </>
                )}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
