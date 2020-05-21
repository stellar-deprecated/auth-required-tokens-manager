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

export const PaymentQRCodeButton = ({
  kpSender,
  kpReceiver,
  asset,
  kpIssuer,
}: Props) => {
  const dispatch = useDispatch();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentQRCode, setPaymentQRCode] = useState("web+stellar:pay?");
  const onError = (error: any) =>
    dispatch(UpdatedAtActionCreator.showError(error));

  const handleShowPaymentModal = () => {
    StellarService.buildPaymentTx({
      sender: kpSender,
      destination: kpReceiver.publicKey,
      amount: "10",
      asset: asset,
      issuer: kpIssuer,
    })
      .then((tx) => {
        const uri = TransactionStellarUri.forTransaction(tx);
        uri.originDomain = "toml-files.herokuapp.com";
        uri.addSignature(Keypair.fromSecret(kpIssuer.secret));
        console.log(uri.toString());
        setPaymentQRCode(encodeURIComponent(uri.toString()));
        setShowPaymentModal(true);
        return validateSep7Uri({ uriString: uri.toString(), onError });
      })
      .catch(onError);
  };

  return (
    <>
      <Modal
        isActive={showPaymentModal}
        title="Payment QR Code"
        cancelCallback={() => setShowPaymentModal(false)}
        confirmCallback={() => setShowPaymentModal(false)}
      >
        This is a QRCode to transfer (payment) from sender to receiver
        <QRCode value={paymentQRCode} />
      </Modal>
      <button className="button is-warning" onClick={handleShowPaymentModal}>
        QR Code: Payment Sender => Receiver
      </button>
    </>
  );
};
