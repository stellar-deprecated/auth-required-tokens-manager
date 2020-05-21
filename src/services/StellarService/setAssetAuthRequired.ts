import {
  AccountResponse,
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  AuthRevocableFlag,
  AuthRequiredFlag,
  AuthFlag,
  Keypair,
} from "stellar-sdk";
import StellarService from "services/StellarService";

interface Props {
  account: AccountResponse;
  secret: string;
}

export const setAssetAuthRequired = ({
  account,
  secret,
}: Props): Promise<Horizon.SubmitTransactionResponse | void> => {
  const txBuilder = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  }).addOperation(
    Operation.setOptions({
      setFlags: (AuthRevocableFlag | AuthRequiredFlag) as AuthFlag,
    }),
  );

  const transaction = txBuilder.setTimeout(100).build();
  transaction.sign(Keypair.fromSecret(secret));

  return StellarService.server().submitTransaction(transaction);
};
