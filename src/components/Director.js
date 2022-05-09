import { useState } from "react";
import styled from "styled-components";
import Palette from "./Palette";
import inputBtnImage from "../assets/images/inputmenubtn.png";

const Wrapper = styled.div`
  display: flex;
`;

const PaletteContainer = styled.div`
  width: 20vw;
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  position: relative;
  cursor: not-allowed;
`;

const BlackContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 97vh;
  background-color: red;
  opacity: 0.5;
  pointer-events: none;
`;

const ContentContainer = styled.div`
  width: 50vw;
  background-color: lightgray;
  border: 1px solid black;
`;

const PlayerContainer = styled.div`
  padding-top: 5vh;
  width: 30vw;
  background-color: lightgray;
  border: 3px solid gray;
  display: grid;
  grid-template-columns: 25vw;
  grid-template-rows: 20vh 20vh 20vh 20vh;
  grid-gap: 3vh;
  justify-content: center;
`;

const Text = styled.h2`
  text-align: center;
`;

const ChatWrapper = styled.div`
  text-align: center;
`;

const ChatOkBtn = styled.button`
  margin-left: 50px;
  cursor: pointer;
`;

const Player = styled.div`
  background-color: white;
  border: 3px solid gray;
`;

const DirectorChat = styled.input`
  width: 400px;
  height: 40px;
  margin-left: 100px;
  margin-bottom: 10px;
  text-align: center;
  overflow: hidden;
`;

const ImageInput = styled.input.attrs({
  type: "file",
  id: "ex_file",
  accept: "image/jpg, image/png, image/jpeg",
})`
  display: none;
`;

const ImageInputWrap = styled.div`
  margin: 0 8px 0 8px;
  text-align: center;
`;

const BackgroundImage = styled.div`
  margin-top: 50px;
  cursor: pointer;
`;

const UserChatList = styled.input.attrs({
  type: "text",
})`
  width: 30vw;
  height: 15vh;
  cursor: default;
  &:focus {
    outline: none;
  }
`;

const UserChat = styled.input.attrs({
  type: "text",
})`
  margin-top: 30px;
  width: 30vw;
  height: 3vh;
`;

const UserChatWrapper = styled.div`
  text-align: center;
`;

function Director() {
  const [color, setColor] = useState("black");
  const [value, setValue] = useState(2.5);
  const [init, setInit] = useState(0);
  const [chat, setChat] = useState("");
  const [myImage, setMyImage] = useState(inputBtnImage);
  const [chatList, setChatList] = useState("test1 : hello");

  const onChange = (event) => {
    const val = event.target.value;
    setChat(val);
  };

  const inputOnChange = (event) => {
    const nowSelectImageList = event.target.files;
    const nowImageUrl = URL.createObjectURL(nowSelectImageList[0]);
    setMyImage(nowImageUrl);
  };

  return (
    <Wrapper>
      <PaletteContainer>
        <BlackContainer>
          <Palette setColor={setColor} setValue={setValue} setInit={setInit} />
        </BlackContainer>
      </PaletteContainer>
      <ContentContainer>
        <Text>디렉터 채팅</Text>
        <hr />
        <ChatWrapper>
          <DirectorChat value={chat} onChange={onChange} />
          <ChatOkBtn>보내기</ChatOkBtn>
          <hr />
        </ChatWrapper>
        <ImageInputWrap>
          <label htmlFor="ex_file">
            <BackgroundImage>
              <img src={myImage} alt="myImage" width="500" height="300" />
            </BackgroundImage>
            <hr />
          </label>
          <ImageInput onChange={inputOnChange} />
        </ImageInputWrap>
        <UserChatWrapper>
          <UserChatList readonly defaultValue={chatList} />
          <UserChat />
        </UserChatWrapper>
      </ContentContainer>
      <PlayerContainer>
        <Player></Player>
        <Player></Player>
        <Player></Player>
        <Player></Player>
      </PlayerContainer>
    </Wrapper>
  );
}

export default Director;
