import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import axios from "axios";
import SettingBtn from "../components/SettingBtn";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  background-color: #718093;
  max-width: 100vw;
`;
const Top = styled.div`
  height: 10vh;
`;
const Header = styled.div`
  text-align: center;
  height: 30vh;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

const Content = styled.div`
  text-align: center;
  height: 50vh;
`;

const CreateRoomBtn = styled.button`
  display: block;
  width: 20vw;
  height: 5vh;
  margin: 5vw auto;
  cursor: pointer;
`;

const EnterBtn = styled(CreateRoomBtn)``;

const Main = (props) => {
  const history = useHistory();
  let code = 1;
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const roomOnClick = () => {
    axios
      .get("http://localhost:3001/createRoom", {
        params: {
          nickname: name,
        },
      })
      .then(function (response) {
        code = response.data.entercode;
        props.setCode(code);
        history.push(`/waiting/${code}?${name}`);
      });
  };

  const onChange = (event) => {
    const name = event.target.value;
    setName(name);
    props.setNickname(name);
  };

  const btnClick = () => {
    const Ec = document.getElementById("ECode");
    code = Ec.value;
    props.setCode(code);
    axios
      .get("http://localhost:3001/enter", {
        params: {
          nickname: name,
          entercode: code,
        },
      })
      .then(function (response) {
        const stateData = response.data.state;
        if (stateData == "ok") {
          history.push(`/waiting/${code}?${name}`);
        } else {
          console.log("fail");
        }
      });
  };

  return (
    <Container>
      <Top>
        <SettingBtn></SettingBtn>
      </Top>
      <Header>
        <Title>같이 그릴까?</Title>
      </Header>
      <Content>
        <NameInput value={name} onChange={onChange} />
        <CreateRoomBtn onClick={roomOnClick}>방 만들기</CreateRoomBtn>
        <EnterBtn onClick={openModal}>입장하기</EnterBtn>
        <Modal
          open={modalOpen}
          close={closeModal}
          header="입장 코드를 입력해주세요"
          click={btnClick}
        ></Modal>
      </Content>
    </Container>
  );
};

const NameInput = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "20vw",
  maxLength: "10",
  placeholder: "닉네임을 입력해주세요",
}))`
  width: ${(props) => props.size};
  height: 20px;
  align-items: center;
`;

export default Main;
