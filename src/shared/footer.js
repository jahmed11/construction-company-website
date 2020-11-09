import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const FooterDiv = styled.div`
  width: 100%;
  background-color: #000;
  height: 130px;
  margin-top: 25px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Span = styled.span`
  color: #c8b592;
  margin: 0;
  padding: 0;
  display: block;
`;
const Footer = () => {
  const elements = useSelector((state) => state.websiteElements);

  return (
    <FooterDiv>
      <div>
        <Span>{elements.footerTitle}</Span>
      </div>
      <div>
        <Span>{elements.number}</Span>
      </div>
      <div>
        <Span>{elements.email}</Span>
      </div>
    </FooterDiv>
  );
};

export default Footer;
