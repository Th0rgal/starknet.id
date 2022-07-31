import React from "react";
import Head from "next/head";
import styles from "../../styles/Identities.module.css";
import { useStarknet } from "@starknet-react/core";
import { useRouter } from "next/router";
import Button from "../../components/button";
import ClickableIcon from "../../components/clickableIcon";
import { GoUnverified } from "react-icons/go";
import Verified from "../../components/verified";
import { useEffect } from "react";

export default function TokenId() {
  const router = useRouter();
  const { account } = useStarknet();
  const tokenIdAbbreviation =
    router.query.tokenId?.length > 5
      ? router.query.tokenId?.charAt(0) +
      router.query.tokenId?.charAt(1) +
      "..." +
      router.query.tokenId?.charAt(router.query.tokenId?.length - 2) +
      router.query.tokenId?.charAt(router.query.tokenId?.length - 1)
      : router.query.tokenId;

  //Contract calls
  useEffect(() => {
    if (!account) {
      router.push("/home");
    }
  }, [account, router]);

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Starknet.id</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/starknet-logo.webp" />
      </Head>

      <div className={styles.container}>
        <h1 className="sm:text-5xl text-5xl my-2">
          Your identity : {tokenIdAbbreviation}
        </h1>

        <div className="flex">
          <div className="m-3">
            <ClickableIcon icon="twitter" onClick={() => {
              sessionStorage.setItem("tokenId", router.query.tokenId);
              window.location.replace(
                "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=Rkp6QlJxQzUzbTZtRVljY2paS0k6MTpjaQ&redirect_uri=https://starknet.id/twitter&scope=users.read%20tweet.read&state=state&code_challenge=challenge&code_challenge_method=plain"
              );
            }} />
            <div className="flex justify-center items-center">
              <Verified type="twitter" />
            </div>
          </div>
          <div className="m-3">
            <ClickableIcon icon="discord" onClick={() => {
              sessionStorage.setItem("tokenId", router.query.tokenId);
              window.location.replace(
                "https://discord.com/oauth2/authorize?client_id=991638947451129886&redirect_uri=https%3A%2F%2Fstarknet.id%2Fdiscord&response_type=code&scope=identify"
              );
            }} />
            <div className="flex justify-center items-center">
              <Verified type="discord" />
            </div>
          </div>
        </div>
        <Button onClick={() => router.push("/identities")}>
          Back to your identities
        </Button>
      </div>
    </div>
  );
}
