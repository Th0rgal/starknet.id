import Link from "next/link";
import React from "react";
import styles from "../styles/Identities.module.css";
import TwitterIcon from "./icons/twitterIcon";
import DiscordIcon from "./icons/discordIcon";
import SteamIcon from "./icons/steamIcon";
import GithubIcon from "./icons/githubIcon";

const ClickableIcon = ({ icon, onClick }) => {
  return (
    <div className={styles.clickableIcon} onClick={onClick}>
      {icon === "twitter" && <TwitterIcon />}
      {icon === "discord" && <DiscordIcon />}
      {icon === "steam" && <SteamIcon />}
      {icon === "github" && <GithubIcon />}
    </div>
  );
};

export default ClickableIcon;
