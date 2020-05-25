import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Utils from "helpers/Utils";

import ErrorSection from "components/ErrorSection";
import { Env } from "helpers/Env";
import { KeySecret, UpdatedAt } from "helpers/types";
import { useRedux } from "hooks/useRedux";

import { MakeAssetAuthRequiredButton } from "components/AccountInfo/AuthRequiredButtons/MakeAssetAuthRequiredButton";
import { AddTrustlineButton } from "components/AccountInfo/AuthRequiredButtons/AddTrustlineButton";
import { FundSenderButton } from "components/AccountInfo/AuthRequiredButtons/FundSenderButton";
import { CreateMarketButton } from "components/AccountInfo/AuthRequiredButtons/CreateMarketButton";
import { ActionCreators as UpdatedAtActionCreator } from "ducks/updatedAt";
import { PaymentSection } from "components/PaymentSection";
import { PathPaymentSection } from "components/PathPaymentSection";

type Props = {
  kpIssuer: KeySecret;
  kpSender: KeySecret;
  kpReceiver: KeySecret;
};

export function AuthRequiredButtons({ kpIssuer, kpSender, kpReceiver }: Props) {
  const dispatch = useDispatch();
  const { updatedAt } = useRedux<{ updatedAt: UpdatedAt }>("updatedAt");
  const asset = Env.asset;

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
              accountsKS={[kpSender, kpReceiver]}
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
            <CreateMarketButton asset={asset} kpIssuer={kpIssuer} />
          </div>

          <div className="column is-narrow">
            <div className="vertically-center">
              Updated at {Utils.Date.format(updatedAt.date)}
            </div>
          </div>
        </div>

        <PaymentSection
          kpIssuer={kpIssuer}
          asset={asset}
          kpSender={kpSender}
          kpReceiver={kpReceiver}
        />

        <PathPaymentSection
          kpIssuer={kpIssuer}
          asset={asset}
          kpSender={kpSender}
          kpReceiver={kpReceiver}
        />
      </section>
    </div>
  );
}
