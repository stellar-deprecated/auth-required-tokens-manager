import React from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  & > span.tooltiptext {
    position: absolute;
    color: #fff;
    background-color: rgba(85, 85, 85, 0.9);
    text-align: center;
    border-radius: 6px;
    z-index: 1000;
    width: 60px;
    padding: 5px 5px;
    bottom: 125%;
    left: 50%;
    margin-left: -30px;
  }

  & > span.tooltiptext:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  & > span.tooltiptext.fadeOut {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms;
  }

  & > span.tooltiptext.fadeIn {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;

export const Tooltip = ({
  value,
  visible,
  children,
}: {
  value: string;
  visible?: boolean | undefined;
  children?: React.ReactNode;
}) => {
  const className = "tooltiptext" + (visible ? " fadeIn" : " fadeOut");

  return (
    <TooltipContainer>
      {children}
      <span className={className}>{value}</span>
    </TooltipContainer>
  );
};
