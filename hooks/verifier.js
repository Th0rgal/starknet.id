import { useContract } from "@starknet-react/core";
import verifier_abi from "../abi/verifier_abi.json";

export function useVerifierIdContract() {
  return useContract({
    abi: verifier_abi,
    address:
      "0x06520a4a1934c84a385a3088952c3812c96f9e9c614bc4d483daff5622ea9fad",
  });
}
