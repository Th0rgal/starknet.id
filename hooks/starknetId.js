import { useContract } from "@starknet-react/core";
import starknet_id_abi from "../abi/starknet_id_abi.json";

export function useStarknetIdContract() {
  return useContract({
    abi: starknet_id_abi,
    address: "0x04564121a7ad7757c425e4dac1a855998bf186303107d1c28edbf0de420e7023",
  });
}
