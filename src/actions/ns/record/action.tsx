import {
  useCopilotAction,
} from "@copilotkit/react-core";
import { NftListCard } from "./component";
import { isValidSuiAddress, formatAddress } from "@mysten/sui/utils";
import { useSuiClient } from "@mysten/dapp-kit";
import { SuinsClient } from "@mysten/suins"

export const useGetNsRecordAction = () => {
  const client = useSuiClient();
  const suinsClient = new SuinsClient({
    client: client as any,
  });
  return useCopilotAction({
    name: "action_get_ns_record",
    description:
      "Get information about a registered Sui Name Service (SNS) domain",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "The domain name to look up (e.g., 'example.sui')",
      },
    ],
    handler: async ({ name }) => {
      // Modify name following suins
      name = name.toLowerCase();
      if (!name.endsWith(".sui")) {
        name = name + ".sui";
      }

      const nameRecord = await suinsClient.getNameRecord(name) as any;
      if (!nameRecord) {
        return undefined;
      }
      let humanReadableTime = "Unknown";
      let originalTimestamp = "";

      if (nameRecord && nameRecord.expirationTimestampMs) {
        const expirationDate = new Date(nameRecord.expirationTimestampMs);
        originalTimestamp = `${nameRecord.expirationTimestampMs}`;

        // Replace the timestamp with formatted version
        nameRecord.expirationTimestamp = `${humanReadableTime} (${originalTimestamp} ms)`;
      }
      return nameRecord
    },
    followUp: false,
  });
};
