import {
  AccountResponse,
  Asset,
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  Keypair,
} from "stellar-sdk";

import { HorizonBalanceLine } from "helpers/types";

import StellarService from "services/StellarService";

interface Props {
  account: AccountResponse;
  accountSecret: string;
  asset: Asset;
}
export const addTrustline = ({
  account,
  accountSecret,
  asset,
}: Props): Promise<Horizon.SubmitTransactionResponse | void> => {
  const trustlineAlreadyExists = account.balances.find((b) => {
    const balance = b as HorizonBalanceLine;
    return (
      balance.asset_code === asset.code && balance.asset_issuer === asset.issuer
    );
  });
  if (trustlineAlreadyExists) {
    return Promise.resolve();
  }

  const txBuilder = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  }).addOperation(Operation.changeTrust({ asset }));

  const transaction = txBuilder.setTimeout(100).build();
  transaction.sign(Keypair.fromSecret(accountSecret));
  return StellarService.server().submitTransaction(transaction);
};
