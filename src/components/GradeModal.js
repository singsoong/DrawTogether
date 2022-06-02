import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const modalShow = keyframes`
    from{
        opacity: 0;
        margin-top: -50px;
    }
    to{
        opacity: 1;
        margin-top: 0;
    }
`;

const modalBgShow = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

const OpenModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  animation: ${modalBgShow} 0.3s;
`;

const Section = styled.div`
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: ${modalShow} 0.3s;
  overflow: hidden;
`;
const Header = styled.div`
  position: relative;
  padding: 0px 64px;
  background-color: #f1f1f1;
  font-weight: 700;
  text-align: center;
`;

const Main = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
  text-align: center;
`;

const Footer = styled.div`
  padding: 12px 16px;
  text-align: center;
`;

const Modal = (props) => {
  const { open, close, header, click } = props;
  const [code, setCode] = useState("");

  const onChange = (event) => {
    const value = event.target.value;
    if (value.length > 6) {
      setCode(value.slice(0, 6));
    } else {
      setCode(value);
    }
  };

  return (
    <>
      {open ? (
        <OpenModal>
          <Section>
            <Header>
                <h1>test</h1>
            </Header>
            <Main>
                <h2>test2</h2>
            </Main>
            <Footer>
                <h3>test3</h3>  
            </Footer>
          </Section>
        </OpenModal>
      ) : null}
    </>
  );
};

export default Modal;
