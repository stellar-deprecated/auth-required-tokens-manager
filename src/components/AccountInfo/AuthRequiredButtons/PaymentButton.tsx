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

export const PaymentButton = ({
  kpSender,
  kpReceiver,
  asset,
  kpIssuer,
}: Props) => {
  const dispatch = useDispatch();

  const handlePayment = () => {
    StellarService.payment({
      sender: kpSender,
      destination: kpReceiver.publicKey,
      amount: "10",
      asset: asset,
      issuer: kpIssuer,
    })
      .then(() => dispatch(UpdatedAtActionCreator.updateDate()))
      .catch((err) => dispatch(UpdatedAtActionCreator.showError(err)));
  };

  return (
    <button className="button is-info" onClick={handlePayment}>
      Payment Sender => Receiver
    </button>
  );
};
