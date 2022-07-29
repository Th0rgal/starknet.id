import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Identities.module.css";
import {
  useStarknet,
  useConnectors,
  useStarknetCall,
  useStarknetInvoke,
  useStarknetTransactionManager,
} from "@starknet-react/core";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../components/button";
import ErrorScreen from "../components/errorScreen";
import LoadingScreen from "../components/loadingScreen";
import { useStarknetIdContract } from "../hooks/starknetId";
import { stringToFelt } from "../utils/felt";
import SuccessScreen from "../components/successScreen";

export default function Twitter() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(true);

  // Access localStorage
  const isServer = typeof window === "undefined";
  let tokenId;
  if (!isServer) {
    tokenId = window.sessionStorage.getItem("tokenId");
  }

  //Connection
  const { connect, connectors } = useConnectors();
  const { account } = useStarknet();

  //Contract
  const { contract } = useStarknetIdContract();

  //GetData
  const { data: twitterId, error: twitterIdError } = useStarknetCall({
    contract: contract,
    method: "get_data",
    args: [[tokenId, 0], stringToFelt("twitter")],
  });

  //SetData
  const {
    data: twitterIdSetterData,
    invoke,
    error: twitterIdSetterError,
  } = useStarknetInvoke({
    contract: contract,
    method: "set_data",
  });
  const [twitterIdSetterPossibility, settwitterIdSetterPossibility] =
    useState(undefined);
  const [twitterIdSetterSuccess, settwitterIdSetterSuccess] = useState(false);
  const { transactions } = useStarknetTransactionManager();

  //Server POST request
  const [verifyData, setVerifyData] = useState(undefined);
  const [startProcessData, setStartProcessData] = useState(undefined);

  //Screen management
  const successScreenCondition =
    isConnected && verifyData?.status === "success";

  const errorScreenCondition =
    isConnected &&
    !successScreenCondition &&
    (startProcessData?.status === "error" ||
      verifyData?.status === "error" ||
      twitterIdError ||
      twitterIdSetterError);

  console.log("aloha", successScreenCondition, startProcessData?.status, verifyData?.status, twitterIdError, twitterIdSetterError)

  const loadingScreenCondition =
    isConnected &&
    !errorScreenCondition &&
    !successScreenCondition &&
    !twitterIdSetterPossibility;

  const twitterIdSetterScreen =
    isConnected && twitterIdSetterPossibility && !errorScreenCondition;

  //Fonctions
  function generateRandomString() {
    let returnString = "";

    for (let index = 0; index < 31; index++) {
      returnString += Math.floor(Math.random() * 10);
    }

    return returnString;
  }

  function settwitterInfos() {
    invoke({
      args: [[tokenId, 0], stringToFelt("twitter"), startProcessData.id],
    });
  }

  //Set reference only one time
  const [reference, setReference] = useState(undefined);
  useEffect(() => {
    setReference(generateRandomString());
  }, []);

  const [code, setCode] = useState(undefined);
  useEffect(() => {
    setCode(router.query.code);
  }, [router]);

  //First server request
  useEffect(() => {
    if (!reference || !code) return;

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        reference: reference,
        type: "twitter",
        code: code,
      }),
    };

    fetch("https://verify.starknet.id/start_process", requestOptions)
      .then((response) => response.json())
      .then((data) => setStartProcessData(data));
  }, [code, reference]);

  //Connection verification
  useEffect(() => {
    if (!account) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [account]);

  //First server request verification
  useEffect(() => {
    if (twitterIdSetterSuccess === "loading") return;

    if (
      twitterId &&
      startProcessData?.status === "success" &&
      startProcessData.id != twitterId.toString()
    ) {
      settwitterIdSetterPossibility(true);
    } else if (
      twitterId &&
      startProcessData?.status === "success" &&
      startProcessData.id.toString() === twitterId.toString()
    ) {
      settwitterIdSetterSuccess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twitterId, startProcessData]);

  //Verification server request
  useEffect(() => {
    if (twitterIdSetterSuccess === true) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          reference: reference,
          type: "twitter",
          nftid: Number(tokenId),
        }),
      };

      fetch("https://verify.starknet.id/verify", requestOptions)
        .then((response) => response.json())
        .then((data) => setVerifyData(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twitterIdSetterSuccess]);

  useEffect(() => {
    for (const transaction of transactions)
      if (transaction.transactionHash === twitterIdSetterData) {
        if (transaction.status === "TRANSACTION_RECEIVED") {
          settwitterIdSetterPossibility(false);
          settwitterIdSetterSuccess("loading");
        }
        if (
          transaction.status === "ACCEPTED_ON_L2" ||
          transaction.status === "ACCEPTED_ON_L1"
        ) {
          settwitterIdSetterSuccess(true);
        }
      }
  }, [twitterIdSetterData, transactions]);

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Starknet.id</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/starknet-logo.webp" />
      </Head>

      <div className={styles.container}>
        {!isConnected &&
          connectors.map((connector) =>
            connector.available() && connector.options.id === "argent-x" ? (
              <>
                <h1 className="sm:text-5xl text-5xl">
                  You need to connect anon
                </h1>
                <Button key={connector.id()} onClick={() => connect(connector)}>
                  Connect Wallet
                </Button>
              </>
            ) : null
          )}
        {loadingScreenCondition && <LoadingScreen />}
        {errorScreenCondition && (
          <ErrorScreen
            onClick={() => router.push(`/identities/${tokenId}`)}
            errorButton="Retry to connect"
          />
        )}
        {successScreenCondition && (
          <>
            <SuccessScreen
              onClick={() => router.push(`/identities/${tokenId}`)}
              successButton="Get back to your starknet identity"
              successMessage="What a chad, you're twitter is verified !"
            />
            <p className="mt-2">
              <a
                className="footerLink"
                href={`https://alpha4.starknet.io/feeder_gateway/get_transaction_receipt?transactionHash=${verifyData?.txid}`}
              >
                Check your transaction state
              </a>
            </p>
          </>
        )}
        {twitterIdSetterScreen && (
          <>
            <h1 className="sm:text-5xl text-5xl mt-4">
              It&apos;s time to set your twitter infos anon !
            </h1>
            <Button onClick={settwitterInfos}>
              Set my twitter infos on chain
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
