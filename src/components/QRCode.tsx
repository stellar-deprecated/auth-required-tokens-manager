import React from "react";
import styled from "styled-components";

const QRCodeImage = styled.img<{ size: number }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

type Props = {
  value: string;
  size?: number;
};

export const QRCode = ({ value, size = 600 }: Props) => {
  const uri = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${value}`;
  return <QRCodeImage src={uri} size={size} />;
};
