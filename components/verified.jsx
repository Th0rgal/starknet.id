import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { GoVerified, GoUnverified } from "react-icons/go";
import { useStarknetCall } from "@starknet-react/core";
import { useStarknetIdContract } from "../hooks/starknetId";
import { stringToFelt } from "../utils/felt";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Verified = ({ type }) => {

    const router = useRouter();
    const { contract } = useStarknetIdContract();
    const {
        data,
        error,
    } = useStarknetCall({
        contract: contract,
        method: "is_valid",
        args: [
            [router.query.tokenId, 0],
            stringToFelt(type),
            "0x007bECf86Ed10ca16B34d6D36552269745d28C76c30cf0F683da7252Da14C038",
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
        <MutatingDots
            height="25"
            width="25"
            color="#ff5008"
            secondaryColor="white"
            ariaLabel="loading"
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
    )
};

export default Verified;
