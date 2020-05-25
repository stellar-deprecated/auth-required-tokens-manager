import React from "react";
import { useDispatch } from "react-redux";
import { Asset } from "stellar-sdk";

import { ActionCreators as UpdatedAtActionCreator } from "ducks/updatedAt";
import { KeySecret } from "helpers/types";
import StellarService from "services/StellarService";

interface Props {
  kpSender: KeySecret;
  asset: Asset;
  kpIssuer: KeySecret;
}

export const FundSenderButton = ({ kpSender, asset, kpIssuer }: Props) => {
  const dispatch = useDispatch();

  const handleFundSender = () => {
    StellarService.payment({
      sender: kpIssuer,
      destination: kpSender.publicKey,
      amount: "1000",
      asset: asset,
      issuer: kpIssuer,
    })
      .then(() => dispatch(UpdatedAtActionCreator.updateDate()))
      .catch((err) => dispatch(UpdatedAtActionCreator.showError(err)));
  };

  return (
    <button className="button is-small is-info" onClick={handleFundSender}>
      Fund Sender
    </button>
  );
};
