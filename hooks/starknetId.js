import { useContract } from "@starknet-react/core";
import starknet_id_abi from "../abi/starknet_id_abi.json";

export function useStarknetIdContract() {
  return useContract({
    abi: starknet_id_abi,
    address:
      "0x027cac460bfddb38ee6403490fb23836dc047410edcf6cba5167ef04cfe2e821",
  });
}
