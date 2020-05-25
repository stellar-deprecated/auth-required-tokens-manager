import React, { useState } from "react";
import styled from "styled-components";

import { shortenStellarAddress } from "helpers/shortenStellarAddress";

import { Tooltip } from "components/Tooltip";

export const Anchor = styled.span`
  cursor: pointer;
  color: #3273dc;
`;

interface Props {
  stellarAddress: string;
}

export const PublicKeyField = ({ stellarAddress }: Props) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <span>
      <Tooltip value="Copied" visible={isTooltipVisible}>
        <Anchor
          onClick={() => {
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = stellarAddress;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
            setIsTooltipVisible(true);
            setTimeout(() => setIsTooltipVisible(false), 2500);
          }}
        >
          {shortenStellarAddress(stellarAddress)}
        </Anchor>
      </Tooltip>
    </span>
  );
};
