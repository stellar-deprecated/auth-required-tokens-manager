import React from "react";
import { useDispatch } from "react-redux";
import { Asset } from "stellar-sdk";

import { ActionCreators as UpdatedAtActionCreator } from "ducks/updatedAt";
import { KeySecret } from "helpers/types";
import StellarService from "services/StellarService";

interface Props {
  kpMarketMaker: KeySecret;
  asset: Asset;
  kpIssuer: KeySecret;
}

export const CreateMarketButton = ({
  kpMarketMaker,
  asset,
  kpIssuer,
}: Props) => {
  const dispatch = useDispatch();

  const handleCreateMarket = () => {
    StellarService.createOffer({
      account: kpMarketMaker,
      amount: 1000,
      buyingAsset: asset,
      sellingAsset: Asset.native(),
      authRequired: {
        asset: asset,
        issuer: kpIssuer,
      },
    })
      .then(() => dispatch(UpdatedAtActionCreator.updateDate()))
      .catch((err) => dispatch(UpdatedAtActionCreator.showError(err)));
  };

  return (
    <button className="button is-info" onClick={handleCreateMarket}>
      Create Market
    </button>
  );
};
