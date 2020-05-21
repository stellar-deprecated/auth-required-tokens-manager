import {
  Asset,
  TransactionBuilder,
  Networks,
  Operation,
  Keypair,
  Transaction,
} from "stellar-sdk";

import { KeySecret } from "helpers/types";
import StellarService from "services/StellarService";

interface Props {
  account: KeySecret;
  sendAsset: Asset;
  sendAmount: string;
  destAsset: Asset;
  destination: string;
  authRequired?: { issuer: KeySecret; asset: Asset };
}

export const buildPathPaymentTx = async ({
  account,
  sendAsset,
  sendAmount,
  destAsset,
  destination,
  authRequired,
}: Props): Promise<Transaction> =>
  StellarService.getAccount(account.publicKey).then((accountResponse) => {
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
      txBuilder.addOperation(
        Operation.allowTrust({
          assetCode: authRequired!.asset.code,
          trustor: destination,
          authorize: true,
          source: authRequired!.issuer.publicKey,
        }),
      );
    }

    txBuilder.addOperation(
      Operation.pathPaymentStrictSend({
        destAsset,
        sendAsset,
        destination,
        sendAmount,
        destMin: "1",
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
      txBuilder.addOperation(
        Operation.allowTrust({
          assetCode: authRequired!.asset.code,
          trustor: destination,
          authorize: false,
          source: authRequired!.issuer.publicKey,
        }),
      );
    }

    const transaction = txBuilder.setTimeout(100).build();

    if (shouldSandwich) {
      transaction.sign(Keypair.fromSecret(authRequired!.issuer.secret));
    }
    return transaction;
  });

export const pathPayment = ({
  account,
  sendAsset,
  sendAmount,
  destAsset,
  destination,
  authRequired,
}: Props): Promise<any> =>
  buildPathPaymentTx({
    account,
    sendAsset,
    sendAmount,
    destAsset,
    destination,
    authRequired,
  }).then((transaction) => {
    transaction.sign(Keypair.fromSecret(account.secret));

    return StellarService.server().submitTransaction(transaction);
  });
