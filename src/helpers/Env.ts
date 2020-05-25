import { Keypair, Asset } from "stellar-sdk";
import { KeySecret, getKeySecret } from "helpers/types";

const kpIssuer = Keypair.fromSecret(
  process.env.REACT_APP_ISSUER_SECRET as string,
);

export const Env = {
  issuer: getKeySecret(kpIssuer),

  sender: {
    publicKey: process.env.REACT_APP_SENDER_PUBLIC_KEY as string,
    secret: process.env.REACT_APP_SENDER_SECRET as string,
  } as KeySecret,

  receiver: getKeySecret(
    Keypair.fromSecret(process.env.REACT_APP_RECEIVER_SECRET as string),
  ),

  asset: new Asset(
    process.env.REACT_APP_ASSET_NAME as string,
    kpIssuer.publicKey(),
  ),
};
