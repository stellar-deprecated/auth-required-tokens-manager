import React, { useState } from "react";
import { Asset } from "stellar-sdk";
import styled from "styled-components";

import { KeySecret } from "helpers/types";

import { PathPaymentButton } from "components/PathPaymentButton";
import { PathPaymentQRCodeButton } from "components/PathPaymentQRCodeButton";

type Props = {
  kpIssuer: KeySecret;
  asset: Asset;
  kpSender: KeySecret;
  kpReceiver: KeySecret;
};

const VerticalSeparator = styled.span`
  border-left: 1px solid #5f656d;
  width: 1px;
  height: 100%;
  display: flex;
`;

export const PathPaymentSection = ({
  kpIssuer,
  asset,
  kpSender,
  kpReceiver,
}: Props) => {
  const [amount, setAmount] = useState<string>("10");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.validity.valid) {
      const newAmount = e.target.value.replace(/^0+/, "");
      setAmount(!newAmount ? "0" : newAmount);
    }
  };

  return (
    <div className="columns is-desktop is-multiline is-centered">
      <div className="column is-narrow">
        <h4 className="subtitle vertically-center">Path Payment:</h4>
      </div>

      <div className="column is-narrow">
        <input
          className="input is-small"
          type="text"
          pattern="^-?[0-9]\d*\.?\d*$"
          value={amount}
          onChange={handleTextChange}
        />
      </div>

      <div className="column is-narrow">
        <p className="vertically-center">
          <strong>{asset.code} => XLM</strong>
        </p>
      </div>
      <div className="column is-narrow">
        <VerticalSeparator />
      </div>

      <div className="column is-narrow">
        <PathPaymentButton
          kpSender={kpSender}
          kpReceiver={kpReceiver}
          asset={asset}
          amount={amount}
          kpIssuer={kpIssuer}
        />
      </div>

      <div className="column is-narrow">
        <PathPaymentQRCodeButton
          kpSender={kpSender}
          kpReceiver={kpReceiver}
          asset={asset}
          amount={amount}
          kpIssuer={kpIssuer}
        />
      </div>
    </div>
  );
};
