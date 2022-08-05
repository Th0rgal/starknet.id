import { useContract } from "@starknet-react/core";
import starknet_id_abi from "../abi/starknet_id_abi.json";

export function useStarknetIdContract() {
  return useContract({
    abi: starknet_id_abi,
    address:
      "0x02362b9eb2edf06e2dcbed55cc0ea98d0d69572da5a4922387cc60d25d8dd9ea",
  });
}
