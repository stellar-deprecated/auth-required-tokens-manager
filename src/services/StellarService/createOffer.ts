import { KeySecret } from "helpers/types";
import {
  Asset,
  TransactionBuilder,
  Networks,
  Operation,
  Keypair,
} from "stellar-sdk";
import StellarService from "services/StellarService";

interface Props {
  sellingAsset: Asset;
  buyingAsset: Asset;
  amount: number;
  authRequired: {
    issuer: KeySecret;
    asset: Asset;
  };
}

export const createOffer = async ({
  sellingAsset,
  buyingAsset,
  amount,
  authRequired,
}: Props): Promise<any> => {
  return StellarService.getAccount(authRequired.issuer.publicKey).then(
    (accountResponse) => {
      const txBuilder = new TransactionBuilder(accountResponse, {
        fee: "100",
        networkPassphrase: Networks.TESTNET,
      });

      txBuilder.addOperation(
        Operation.createPassiveSellOffer({
          selling: sellingAsset,
          amount: amount.toString(),
          buying: buyingAsset,
          price: 1,
          source: authRequired.issuer.publicKey,
        }),
      );

      const transaction = txBuilder.setTimeout(100).build();
      transaction.sign(Keypair.fromSecret(authRequired.issuer.secret));

      return StellarService.server().submitTransaction(transaction);
    },
  );
};
