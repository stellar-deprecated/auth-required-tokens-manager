import StellarSDK, { AccountResponse, Server, ServerApi } from "stellar-sdk";

import { addTrustline } from "services/StellarService/addTrustline";
import { createOffer } from "services/StellarService/createOffer";
import { buildPaymentTx, payment } from "services/StellarService/payment";
import {
  buildPathPaymentTx,
  pathPayment,
} from "services/StellarService/pathPayment";
import { setAssetAuthRequired } from "services/StellarService/setAssetAuthRequired";

const StellarService = {
  horizonServerName: "https://horizon-testnet.stellar.org",

  expertNetwork: "https://stellar.expert/explorer/testnet/",

  server: (): Server => new StellarSDK.Server(StellarService.horizonServerName),

  getAccount: (publicKey: string): Promise<AccountResponse> => {
    return StellarService.server().loadAccount(publicKey);
  },

  getOperations: async (
    account: AccountResponse,
  ): Promise<ServerApi.OperationRecord[]> => {
    return account
      .operations({
        limit: 10,
        order: "desc",
      })
      .then((op) => op.records);
  },

  getOffers: async (
    account: AccountResponse,
  ): Promise<ServerApi.OfferRecord[]> => {
    return account
      .offers({
        limit: 10,
        order: "desc",
      })
      .then((of) => of.records);
  },

  setAssetAuthRequired,

  addTrustline,

  createOffer,

  buildPaymentTx,

  payment,

  buildPathPaymentTx,

  pathPayment,
};

export default StellarService;
