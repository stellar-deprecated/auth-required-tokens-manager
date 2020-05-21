import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Asset } from "stellar-sdk";

import Utils from "helpers/Utils";

import ErrorSection from "components/ErrorSection";
import { KeySecret, UpdatedAt } from "helpers/types";
import { MakeAssetAuthRequiredButton } from "components/AccountInfo/AuthRequiredButtons/MakeAssetAuthRequiredButton";
import { AddTrustlineButton } from "components/AccountInfo/AuthRequiredButtons/AddTrustlineButton";
import { FundSenderButton } from "components/AccountInfo/AuthRequiredButtons/FundSenderButton";
import { PaymentButton } from "components/AccountInfo/AuthRequiredButtons/PaymentButton";
import { PaymentQRCodeButton } from "components/AccountInfo/AuthRequiredButtons/PaymentQRCodeButton";
import { PathPaymentButton } from "components/AccountInfo/AuthRequiredButtons/PathPaymentButton";
import { PathPaymentQRCodeButton } from "components/AccountInfo/AuthRequiredButtons/PathPaymentQRCodeButton";
import { CreateMarketButton } from "components/AccountInfo/AuthRequiredButtons/CreateMarketButton";
import { ActionCreators as UpdatedAtActionCreator } from "ducks/updatedAt";
import { useRedux } from "hooks/useRedux";

type Props = {
  kpIssuer: KeySecret;
  kpMarketMaker: KeySecret;
  kpSender: KeySecret;
  kpReceiver: KeySecret;
};

export function AuthRequiredButtons({
  kpIssuer,
  kpMarketMaker,
  kpSender,
  kpReceiver,
}: Props) {
  const dispatch = useDispatch();
  const { updatedAt } = useRedux<{ updatedAt: UpdatedAt }>("updatedAt");
  const asset = new Asset("5QXRauth", kpIssuer.publicKey);

  return (
    <div>
      <ToastContainer />

      <ErrorSection
        errorMessage={updatedAt.errorMessage}
        onClearError={() => dispatch(UpdatedAtActionCreator.clearError())}
      />

      <section className="section">
        <div className="columns is-desktop is-multiline is-centered">
          <div className="column is-narrow">
            <MakeAssetAuthRequiredButton kpIssuer={kpIssuer} />
          </div>

          <div className="column is-narrow">
            <AddTrustlineButton
              accountsKS={[kpMarketMaker, kpSender, kpReceiver]}
              asset={asset}
            />
          </div>

          <div className="column is-narrow">
            <FundSenderButton
              kpSender={kpSender}
              asset={asset}
              kpIssuer={kpIssuer}
            />
          </div>

          <div className="column is-narrow">
            <CreateMarketButton
              kpMarketMaker={kpMarketMaker}
              asset={asset}
              kpIssuer={kpIssuer}
            />
          </div>

          <div className="column is-narrow">
            <div>Updated at {Utils.Date.format(updatedAt.date)}</div>
          </div>
        </div>

        <div className="columns is-desktop is-multiline is-centered">
          <div className="column is-narrow">
            <PaymentButton
              kpSender={kpSender}
              kpReceiver={kpReceiver}
              asset={asset}
              kpIssuer={kpIssuer}
            />
          </div>

          <div className="column is-narrow">
            <PaymentQRCodeButton
              kpSender={kpSender}
              kpReceiver={kpReceiver}
              asset={asset}
              kpIssuer={kpIssuer}
            />
          </div>
        </div>

        <div className="columns is-desktop is-multiline is-centered">
          <div className="column is-narrow">
            <PathPaymentButton
              kpSender={kpSender}
              kpReceiver={kpReceiver}
              asset={asset}
              kpIssuer={kpIssuer}
            />
          </div>

          <div className="column is-narrow">
            <PathPaymentQRCodeButton
              kpSender={kpSender}
              kpReceiver={kpReceiver}
              asset={asset}
              kpIssuer={kpIssuer}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
