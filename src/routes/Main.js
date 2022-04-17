import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "../components/Modal";
import axios from "axios";
import SettingBtn from "../components/SettingBtn";

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
`;

const EnterBtn = styled(CreateRoomBtn)``;

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  myChangeHandler = (evt) => {
    this.setState({ username: evt.target.value });
  };

  doSave = () => {
    const { username } = this.state;
    alert(username);
  };
}

function Main() {
  const [code, SetCode] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const shoot = () => {
  //   fetch("http://localhost:3001/api")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };

  const startBtn = () => {
    SetCode(Math.floor(Math.random() * 900000) + 100000);
  };

  useEffect(startBtn, []);

  return (
    <Container>
      <Top>
        <SettingBtn></SettingBtn>
      </Top>
      <Header>
        <Title>같이 그릴까?</Title>
      </Header>
      <Content>
        <NameInput onChange={About.myChangeHandler} />
        <Link style={{ textDecoration: "none" }} to={`./waiting/${code}`}>
          <CreateRoomBtn
            onClick={() => {
              axios.get("/api");
              About.doSave();
            }}
          >
            방 만들기
          </CreateRoomBtn>
        </Link>
        <EnterBtn onClick={openModal}>입장하기</EnterBtn>
        <Modal
          open={modalOpen}
          close={closeModal}
          header="입장 코드를 입력해주세요"
        ></Modal>
      </Content>
    </Container>
  );
}

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
