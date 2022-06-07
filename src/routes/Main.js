import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import axios from "axios";
import Volume from "../components/volume";
import { useHistory } from "react-router-dom";
import useSound from './BgmSounds';
import effectSound from './BgmEffect';
import BGM from './Audio/bgm1.mp3'
import {soundStop,getsounds}from './BgmEffect';



const Container = styled.div`
  max-width: 100vw;
  width : 100vw;
  height : 100vh;
  background-image: url("../design/main/main_background.png");
  background-size : cover;
  display : flex;
  flex-direction : column;
`;
const Top = styled.div`
  height: 10vh;
`;
const Header = styled.div`
  text-align: center;
  height: 30vh;
  display : flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 5rem;
  width : 600px;
  height : 150px;
  text-align : center;
  line-height: 150px;
  background-color : white;
  background-image: url("../design/main/title_Background.png");
`;

const Content = styled.div`
  text-align: center;
  height: 50vh;
  display : flex;
  align-items: center;
  justify-content: center;
`;

const ContentsWrap =styled.div`
  width : 600px;
  height : 400px;
  background-color: rgba( 255, 255, 255, 0.4 );
  display : flex;
  flex-direction : column;
  align-items: center;
  justify-content: space-around;
`;
const CreateRoomBtn = styled.button`
  display: block;
  width: 80%;
  height: 70px;
  cursor: pointer;
  margin : 0;
  padding : 0;
  border : 5px solid #e1e1e1;
  border-radius: 10px;
  font-size : 25px;
  background-image: url("../design/main/btn_background.png");
  &:hover{
    border: 5px solid #f7968a;
  }
`;
const SettingBtn = styled.button`
border : 5px solid #f7968a;
border-radius: 10px;
cursor: pointer;
width : 100px;
height : 50px;
text-align : center;
line-height: 40px;
color : black;
&:hover{
  background-color : #ffeacd;
}
`;
const EnterBtn = styled(CreateRoomBtn)``;

const Main = (props) => {
  const history = useHistory();
  let code = 1;
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [vol, setVol] = useState(1);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const roomOnClick = () => {
    axios
      .get(window.location.protocol+"//"+window.location.hostname+":"+"3001/createRoom", {
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
    code = parseInt(Ec.value);
    props.setCode(code);
    axios
      .get(window.location.protocol+"//"+window.location.hostname+":"+"3001/enter", {
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

  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleModalCancel = () => setOpen(false);
  //console.log(vol);

  useEffect(() => {
    effectSound(1,vol);//음악 재생
    props.setMusicVol(vol);
    return ()=> {
      soundStop();//재생중지
    };
  },[vol])
  return (
    <Container>
      <Top>
        <SettingBtn  onClick={handleClick}>설정</SettingBtn>
        <Volume
            isOpen={isOpen}
            onCancel={handleModalCancel}
            vol = {setVol}
          />
      </Top>
      <Header>
        <Title>같이 그릴까?</Title>
      </Header>
      <Content>
        <ContentsWrap>
          <NameInput value={name} onChange={onChange} />
          <CreateRoomBtn onClick={roomOnClick}>방 만들기</CreateRoomBtn>
          <EnterBtn onClick={openModal}>입장하기</EnterBtn>
          <Modal open={modalOpen} close={closeModal} header="입장 코드를 입력해주세요" click={btnClick} ></Modal>
        </ContentsWrap>
      </Content>
    </Container>
  );
};

const NameInput = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "80%",
  maxLength: "10",
  placeholder: "닉네임을 입력해주세요",
}))`
  width: ${(props) => props.size};
  font-size : 30px;
  height: 50px;
  align-items: center;
  text-align : center;
  padding : 0;
  border : none;
  border : 5px solid #e1e1e1;
  border-radius: 10px;
`;

export default Main;
