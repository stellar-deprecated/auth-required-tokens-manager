import React from "react";
import { ServerApi, Horizon } from "stellar-sdk";

import Utils from "helpers/Utils";

import { PublicKeyField } from "components/PublicKeyField";

export const OperationRow = ({
  operation,
}: {
  operation: ServerApi.OperationRecord;
}) => {
  return (
    <tr>
      <td>{operation.id}</td>
      <td>{getOperationDescription({ operation })}</td>
      <td>{Utils.Date.format(new Date(operation.created_at))}</td>
    </tr>
  );
};

export const getOperationDescription = ({
  operation,
}: {
  operation: ServerApi.OperationRecord;
}) => {
  switch (operation.type) {
    case Horizon.OperationResponseType.changeTrust: {
      const changeTrustOp = operation as ServerApi.ChangeTrustOperationRecord;

      const opName =
        parseFloat(changeTrustOp.limit) === 0
          ? `Remove trustline`
          : `Add trustline`;

      return (
        <p>
          <strong>{opName}</strong> to {changeTrustOp.asset_code}
        </p>
      );
    }

    case Horizon.OperationResponseType.allowTrust: {
      const allowTrustOp = operation as ServerApi.AllowTrustOperationRecord;

      const opName = allowTrustOp.authorize ? `authorized` : `deuthorized`;

      return (
        <p>
          <PublicKeyField stellarAddress={allowTrustOp.trustee} />{" "}
          <strong>{opName}</strong> {allowTrustOp.asset_code} trustline for
          account {<PublicKeyField stellarAddress={allowTrustOp.trustor} />}
        </p>
      );
    }

    case Horizon.OperationResponseType.createAccount: {
      const createAccountOp = operation as ServerApi.CreateAccountOperationRecord;

      return (
        <p>
          <PublicKeyField stellarAddress={createAccountOp.funder} />{" "}
          <strong>created account</strong>{" "}
          <PublicKeyField stellarAddress={createAccountOp.account} /> with
          starting balance {parseFloat(createAccountOp.starting_balance)}
        </p>
      );
    }

    case Horizon.OperationResponseType.payment: {
      const paymentOp = operation as ServerApi.PaymentOperationRecord;

      return (
        <p>
          <PublicKeyField stellarAddress={paymentOp.from} />{" "}
          <strong>payment</strong> {parseFloat(paymentOp.amount)}{" "}
          {paymentOp.asset_code || "XLM"} to{" "}
          <PublicKeyField stellarAddress={paymentOp.to} />
        </p>
      );
    }

    case Horizon.OperationResponseType.pathPaymentStrictSend: {
      const paymentOp = operation as ServerApi.PathPaymentStrictSendOperationRecord;

      return (
        <p>
          <PublicKeyField stellarAddress={paymentOp.from} />{" "}
          <strong>path payment</strong> {parseFloat(paymentOp.source_amount)}{" "}
          {paymentOp.source_asset_code || "XLM"} =>{" "}
          {parseFloat(paymentOp.amount)} {paymentOp.asset_code || "XLM"} to{" "}
          <PublicKeyField stellarAddress={paymentOp.to} />
        </p>
      );
    }

    case Horizon.OperationResponseType.createPassiveOffer: {
      const offerOp = operation as ServerApi.PassiveOfferOperationRecord;

      return (
        <p>
          <PublicKeyField stellarAddress={offerOp.source_account} />{" "}
          <strong>placed new passive offer – sell</strong>{" "}
          {parseFloat(offerOp.amount)} {offerOp.selling_asset_code || "XLM"} for{" "}
          {offerOp.buying_asset_code || "XLM"} at {parseFloat(offerOp.price)}{" "}
          {offerOp.buying_asset_code || "XLM"}/
          {offerOp.selling_asset_code || "XLM"}
        </p>
      );
    }

    default:
      return operation.type;
  }
};
