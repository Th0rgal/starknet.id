import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Identities.module.css";

const IdentitiesGallery = ({ tokensData }) => {
  const [hoverState, setHoverState] = useState(false);
  const router = useRouter();

  return (
    <>
      {tokensData.map((data, index) => (
        <div key={index} className={styles.imageGallery}>
          <Image
            width={150}
            height={150}
            src={data.image_uri}
            alt="avatar"
            className={hoverState ? styles.avatarHover : styles.avatar}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            onClick={() => router.push(`/identities/${data.token_id}`)}
          />
        </div>
      ))}
    </>
  );
};

export default IdentitiesGallery;
