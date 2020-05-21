import React from "react";
import { useDispatch } from "react-redux";

import { ActionCreators as UpdatedAtActionCreator } from "ducks/updatedAt";
import { KeySecret } from "helpers/types";
import StellarService from "services/StellarService";

interface Props {
  kpIssuer: KeySecret;
}

export const MakeAssetAuthRequiredButton = ({ kpIssuer }: Props) => {
  const dispatch = useDispatch();

  const handleUpdateAssetAuth = () => {
    StellarService.getAccount(kpIssuer.publicKey)
      .then((account) =>
        StellarService.setAssetAuthRequired({
          account,
          secret: kpIssuer.secret,
        }),
      )
      .then(() => dispatch(UpdatedAtActionCreator.updateDate()))
      .catch((err) => dispatch(UpdatedAtActionCreator.showError(err)));
  };

  return (
    <button className="button is-info" onClick={() => handleUpdateAssetAuth()}>
      Make Asset be Auth Required
    </button>
  );
};
