import { useState, useEffect } from "react";
import styled from "styled-components";
import Canvas from "./Canvas";
import Palette from "./Palette";
import { socket } from "../etc/Socket";

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

const UserChatList = styled.div`
  width: 30vw;
  height: 15vh;
  background: white;
  overflow:auto;
`;

const UserChat = styled.input.attrs({
  type: "text",
})`
  margin-top: 30px;
  width: 30vw;
  height: 3vh;
  margin-right: 20px;
  margin-left: 60px;
`;

const UserChatWrapper = styled.div`
  text-align: center;
`;



const UserChatSendButton = styled.button``;
function Artist(props) {

  const [color, setColor] = useState("black");
  const [value, setValue] = useState(2.5);
  const [init, setInit] = useState(0);
  const [pen, setPen] = useState(true);
  const [re, setRe] = useState(0);
  const [chat, setChat] = useState("");


  useEffect(() => {
    socket.on("Dmessage", function (data) {
      console.log("Dmessage : " + data);
      if(data[1] == 0){ // 디렉터 힌트
        if(data[0].indexOf("힌트1")!= -1){
          console.log("힌트1 이 들어옴.");
          document.getElementById("D_chat").innerText = data[0];
        }else if(data[0].indexOf("힌트2") != -1){
          console.log("힌트2 이 들어옴.");
          document.getElementById("D_chat").innerText = document.getElementById("D_chat").innerText+"\n"+data[0];
        }else if(data[0].indexOf("힌트3") != -1){
          console.log("힌트3 이 들어옴.");
          document.getElementById("D_chat").innerText = document.getElementById("D_chat").innerText+"\n"+data[0];
        }
      }else if(data[1] == 1){ // 시스템 메세지
        document.getElementById("D_chat").innerText = data[0];
      }
    });

    /*socket.on("Umessage", function (data) {
      console.log("Umessage : " + data);

      if(props.director == false){
        const UserChatList = document.getElementById("UserChatList");
        const elemet = document.createElement("div");
        elemet.innerText= data;
        UserChatList.appendChild(elemet);
        UserChatList.scrollTop = UserChatList.scrollHeight;
      }
    });*/
  },[]);

  const userChatOnClick = () => {
    socket.emit("Umessage", [props.code,props.nickname+" : "+chat]);
    setChat("");
  };

  const onChange = (event) => {
    const value = event.target.value;
    setChat(value);
  };

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
        <DirectorText id="D_chat">디렉터가 그림을 선택중입니다.</DirectorText>
        <Canvas color={color} stroke={value} init={init} pen={pen} re={re} code={props.code} nickname={props.nickname} />
        <hr />
        <UserChatWrapper>

          <UserChatList id="UserChatList">
          </UserChatList>

          <UserChat onChange={onChange} value={chat} />
          <UserChatSendButton onClick={userChatOnClick}>
            전송
          </UserChatSendButton>
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
