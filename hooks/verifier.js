import { useContract } from "@starknet-react/core";
import verifier_abi from "../abi/verifier_abi.json";

export function useVerifierIdContract() {
  return useContract({
    abi: verifier_abi,
    address:
      "0x0075b848cbc4fbaedaf31ac8389403b4975ac700bb34d7d615820123e937b4f6",
  });
}
