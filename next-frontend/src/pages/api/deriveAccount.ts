import { NextApiRequest, NextApiResponse } from "next";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { idToken, ephemeralKeyPair } = req.body;

    if (!idToken || !ephemeralKeyPair) {
      return res
        .status(400)
        .json({ message: "idToken 和 ephemeralKeyPair 是必需的" });
    }

    try {
      const aptos = new Aptos(new AptosConfig({ network: Network.DEVNET }));
      const account = await aptos.deriveKeylessAccount({
        jwt: idToken,
        ephemeralKeyPair,
      });

      return res
        .status(200)
        .json({ accountAddress: account.accountAddress.toString(), account });
    } catch (error) {
      console.error("Error deriving keyless account:", error);
      return res
        .status(500)
        .json({ message: "Error deriving keyless account", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
