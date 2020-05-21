import React from "react";
import { useDispatch } from "react-redux";
import { Asset } from "stellar-sdk";

import { ActionCreators as UpdatedAtActionCreator } from "ducks/updatedAt";
import { KeySecret } from "helpers/types";
import StellarService from "services/StellarService";

interface Props {
  kpSender: KeySecret;
  kpReceiver: KeySecret;
  asset: Asset;
  kpIssuer: KeySecret;
}

export const PathPaymentButton = ({
  kpSender,
  kpReceiver,
  asset,
  kpIssuer,
}: Props) => {
  const dispatch = useDispatch();

  const handlePathPayment = () => {
    StellarService.pathPayment({
      account: kpSender,
      destAsset: Asset.native(),
      sendAmount: "10",
      sendAsset: asset,
      destination: kpReceiver.publicKey,
      authRequired: { issuer: kpIssuer, asset: asset },
    })
      .then(() => dispatch(UpdatedAtActionCreator.updateDate()))
      .catch((err) => dispatch(UpdatedAtActionCreator.showError(err)));
  };

  return (
    <button className="button is-info" onClick={handlePathPayment}>
      Path Payment Sender => Receiver
    </button>
  );
};
