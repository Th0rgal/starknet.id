import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { GoVerified, GoUnverified } from "react-icons/go";
import { useStarknetCall } from "@starknet-react/core";
import { useStarknetIdContract } from "../hooks/starknetId";
import { stringToFelt } from "../utils/felt";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Verified = ({ type }) => {
  const router = useRouter();
  const { contract } = useStarknetIdContract();
  const { data, error } = useStarknetCall({
    contract: contract,
    method: "get_verifier_data",
    args: [
      [router.query.tokenId, 0],
      stringToFelt(type),
      "0x0075b848cbc4fbaedaf31ac8389403b4975ac700bb34d7d615820123e937b4f6",
    ],
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (error || !data || Number(data) === 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [data, error]);

  return !data ? (
    <ThreeDots
      height="25"
      width="80"
      radius="9"
      color="#ffffff"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  ) : isValid ? (
    <>
      <p className="mt-1 mr-1 font-bold">Verified</p>
      <GoVerified color="#FF5008" />
    </>
  ) : (
    <>
      <p className="mt-1 mr-1 font-bold">Unverified</p>
      <GoUnverified color="#FF5008" />
    </>
  );
};

export default Verified;
