import { useState } from "react";
import styled from "styled-components";
import Canvas from "./Canvas";
import Palette from "./Palette";

const Wrapper = styled.div`
  display: flex;
`;

const PaletteContainer = styled.div`
  width: 20vw;
  height: 97vh;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
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

const DirectorText = styled.div`
  border: 1px solid black;
  padding: 10px;
  text-align: center;
`;

const Player = styled.div`
  background-color: white;
  border: 3px solid gray;
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

function Artist() {
  const [color, setColor] = useState("black");
  const [value, setValue] = useState(2.5);
  const [init, setInit] = useState(0);
  const [chatList, setChatList] = useState("test1 : hello");
  const [pen, setPen] = useState(true);
  const [re, setRe] = useState(0);

  return (
    <Wrapper>
      <PaletteContainer>
        <Palette
          setColor={setColor}
          setValue={setValue}
          setInit={setInit}
          pen={setPen}
          re={setRe}
        />
      </PaletteContainer>
      <ContentContainer>
        <Text>디렉터</Text>
        <DirectorText>나무가 많고 사람 3명이 서 있다.</DirectorText>
        <Canvas color={color} stroke={value} init={init} pen={pen} re={re} />
        <hr />
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

export default Artist;
