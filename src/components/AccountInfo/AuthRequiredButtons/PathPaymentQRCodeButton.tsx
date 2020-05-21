import { TransactionStellarUri } from "@stellarguard/stellar-uri";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Asset, Keypair } from "stellar-sdk";

import { ActionCreators as UpdatedAtActionCreator } from "ducks/updatedAt";
import { KeySecret } from "helpers/types";
import { validateSep7Uri } from "helpers/validateSep7Uri";
import StellarService from "services/StellarService";

import Modal from "components/Modal";
import { QRCode } from "components/QRCode";

interface Props {
  kpSender: KeySecret;
  kpReceiver: KeySecret;
  asset: Asset;
  kpIssuer: KeySecret;
}

export const PathPaymentQRCodeButton = ({
  kpSender,
  kpReceiver,
  asset,
  kpIssuer,
}: Props) => {
  const dispatch = useDispatch();
  const [showPathPaymentModal, setShowPathPaymentModal] = useState(false);
  const [pathPaymentQRCode, setPathPaymentQRCode] = useState("web+stellar:tx?");
  const onError = (error: any) =>
    dispatch(UpdatedAtActionCreator.showError(error));

  const handleShowPathPaymentModal = () => {
    StellarService.buildPathPaymentTx({
      account: kpSender,
      destAsset: Asset.native(),
      sendAmount: "10",
      sendAsset: asset,
      destination: kpReceiver.publicKey,
      authRequired: { issuer: kpIssuer, asset: asset },
    })
      .then((tx) => {
        const uri = TransactionStellarUri.forTransaction(tx);
        uri.originDomain = "toml-files.herokuapp.com";
        uri.addSignature(Keypair.fromSecret(kpIssuer.secret));
        console.log(uri.toString());
        setPathPaymentQRCode(encodeURIComponent(uri.toString()));
        setShowPathPaymentModal(true);
        return validateSep7Uri({ uriString: uri.toString(), onError });
      })
      .catch(onError);
  };

  return (
    <>
      <Modal
        isActive={showPathPaymentModal}
        title="Path Payment QR Code"
        cancelCallback={() => setShowPathPaymentModal(false)}
        confirmCallback={() => setShowPathPaymentModal(false)}
      >
        This is a QRCode to transfer (path_payment) from sender to receiver
        <QRCode value={pathPaymentQRCode} />
      </Modal>
      <button
        className="button is-warning"
        onClick={handleShowPathPaymentModal}
      >
        QR Code: Path Payment Sender => Receiver
      </button>
    </>
  );
};
