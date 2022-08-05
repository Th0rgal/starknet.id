import { useContract } from "@starknet-react/core";
import verifier_abi from "../abi/verifier_abi.json";

export function useVerifierIdContract() {
  return useContract({
    abi: verifier_abi,
    address:
      "0x00689127b53c6555a15ab6fb5a5e8506cd5e746ddd08bd98eb7506675896e20d",
  });
}
