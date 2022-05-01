import { useEffect, useState } from "react";
import styled from "styled-components";
import Canvas from "../components/Canvas";
import Palette from "../components/Palette";

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

function Game() {
  const [color, setColor] = useState("black");
  const [value, setValue] = useState(2.5);
  const [init, setInit] = useState(0);

  return (
    <Wrapper>
      <PaletteContainer>
        <Palette setColor={setColor} setValue={setValue} setInit={setInit} />
      </PaletteContainer>
      <ContentContainer>
        <Text>디렉터</Text>
        <DirectorText>나무가 많고 사람 3명이 서 있다.</DirectorText>
        <Canvas color={color} stroke={value} init={init} />
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

export default Game;
