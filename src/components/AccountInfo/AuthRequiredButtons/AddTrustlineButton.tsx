import React from "react";
import { useDispatch } from "react-redux";
import { Asset } from "stellar-sdk";

import { ActionCreators as UpdatedAtActionCreator } from "ducks/updatedAt";
import { KeySecret } from "helpers/types";
import StellarService from "services/StellarService";

interface Props {
  accountsKS: KeySecret[];
  asset: Asset;
}

export const AddTrustlineButton = ({ accountsKS, asset }: Props) => {
  const dispatch = useDispatch();

  const handleAddTrustlines = () => {
    Promise.all(
      accountsKS.map((kp) =>
        StellarService.getAccount(kp.publicKey).then((account) =>
          StellarService.addTrustline({
            account,
            accountSecret: kp.secret,
            asset,
          }),
        ),
      ),
    )
      .then(() => dispatch(UpdatedAtActionCreator.updateDate()))
      .catch((err) => dispatch(UpdatedAtActionCreator.showError(err)));
  };

  return (
    <button className="button is-info" onClick={() => handleAddTrustlines()}>
      Add Trustlines
    </button>
  );
};
