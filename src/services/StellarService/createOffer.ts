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
  account: KeySecret;
  sellingAsset: Asset;
  buyingAsset: Asset;
  amount: number;
  authRequired?: {
    issuer: KeySecret;
    asset: Asset;
  };
}

export const createOffer = async ({
  account,
  sellingAsset,
  buyingAsset,
  amount,
  authRequired,
}: Props): Promise<any> => {
  return StellarService.getAccount(account.publicKey).then(
    (accountResponse) => {
      const txBuilder = new TransactionBuilder(accountResponse, {
        fee: "100",
        networkPassphrase: Networks.TESTNET,
      });

      const shouldSandwich =
        authRequired && authRequired.issuer.publicKey !== account.publicKey;
      if (shouldSandwich) {
        txBuilder.addOperation(
          Operation.allowTrust({
            assetCode: authRequired!.asset.code,
            trustor: account.publicKey,
            authorize: true,
            source: authRequired!.issuer.publicKey,
          }),
        );
      }

      txBuilder.addOperation(
        Operation.createPassiveSellOffer({
          selling: sellingAsset,
          amount: amount.toString(),
          buying: buyingAsset,
          price: 1,
          source: authRequired?.issuer.publicKey,
        }),
      );

      if (shouldSandwich) {
        txBuilder.addOperation(
          Operation.allowTrust({
            assetCode: authRequired!.asset.code,
            trustor: account.publicKey,
            authorize: false,
            source: authRequired!.issuer.publicKey,
          }),
        );
      }

      const transaction = txBuilder.setTimeout(100).build();
      transaction.sign(Keypair.fromSecret(account.secret));

      if (shouldSandwich) {
        transaction.sign(Keypair.fromSecret(authRequired!.issuer.secret));
      }

      return StellarService.server().submitTransaction(transaction);
    },
  );
};
