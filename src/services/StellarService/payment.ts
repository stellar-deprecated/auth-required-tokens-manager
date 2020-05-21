import {
  Operation,
  Asset,
  Transaction,
  TransactionBuilder,
  Networks,
  Keypair,
} from "stellar-sdk";
import StellarService from "services/StellarService";
import { KeySecret } from "helpers/types";

interface Props {
  sender: KeySecret;
  destination: string;
  amount: string;
  asset: Asset;
  issuer?: KeySecret;
}

export const buildPaymentTx = async ({
  sender,
  destination,
  amount,
  asset,
  issuer,
}: Props): Promise<Transaction> => {
  return StellarService.getAccount(sender.publicKey).then((account) => {
    var txBuilder = new TransactionBuilder(account, {
      fee: "100",
      networkPassphrase: Networks.TESTNET,
    });

    if (issuer) {
      if (sender.publicKey !== issuer.publicKey) {
        txBuilder.addOperation(
          Operation.allowTrust({
            assetCode: asset.code,
            trustor: sender.publicKey,
            authorize: true,
            source: issuer.publicKey,
          }),
        );
      }
      txBuilder.addOperation(
        Operation.allowTrust({
          assetCode: asset.code,
          trustor: destination,
          authorize: true,
          source: issuer.publicKey,
        }),
      );
    }

    txBuilder.addOperation(
      Operation.payment({
        destination,
        amount: amount.toString(),
        asset,
      }),
    );

    if (issuer) {
      if (sender.publicKey !== issuer.publicKey) {
        txBuilder.addOperation(
          Operation.allowTrust({
            assetCode: asset.code,
            trustor: sender.publicKey,
            authorize: false,
            source: issuer.publicKey,
          }),
        );
      }
      txBuilder.addOperation(
        Operation.allowTrust({
          assetCode: asset.code,
          trustor: destination,
          authorize: false,
          source: issuer.publicKey,
        }),
      );
    }

    const transaction = txBuilder.setTimeout(100).build();

    if (issuer && sender !== issuer) {
      transaction.sign(Keypair.fromSecret(issuer.secret));
    }

    return transaction;
  });
};

export const payment = async ({
  sender,
  destination,
  amount,
  asset,
  issuer,
}: Props): Promise<any> => {
  return buildPaymentTx({
    sender,
    destination,
    amount,
    asset,
    issuer,
  }).then((transaction) => {
    transaction.sign(Keypair.fromSecret(sender.secret));

    return StellarService.server().submitTransaction(transaction);
  });
};
