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
  height: 100vh;
  background-color: #fedac2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 50vw;
  background-color: #fff1e4;
  border-left : 1px solid #fcb198;
  border-right : 1px solid #fcb198;
`;

const PlayerContainer = styled.div`
  padding-top: 5vh;
  width: 30vw;
  background-color: #feeecd;
  display: grid;
  grid-template-columns: 25vw;
  grid-template-rows: 20vh 20vh 20vh 20vh;
  grid-gap: 3vh;
  justify-content: center;
`;

const Text = styled.span`
  text-align: center;
  color: black;
  font-size: 30px;
  width : 100px;
`;

const DirectorText = styled.div`
  height : 30px;
  padding: 10px;
  text-align: center;
  line-height: 30px;
`;

const Player = styled.div`
  background-color: white;
  border: 3px solid gray;
  border-radius: 10px;
`;

const UserChatList = styled.div`
  width: 40vw;
  height: 15vh;
  background: white;
  overflow: auto;
  border: 5px solid #fcb198;
  border-radius: 10px;
  margin-top 20px;
  text-align : left;
  padding-top:20px;
  padding-left:20px;
`;

const UserChat = styled.input.attrs({
  type: "text",
})`
  margin-top: 30px;
  width: 35vw;
  height: 20px;
  border: 5px solid #fcb198;
  border-radius: 10px;
`;

const ChatWrap = styled.div`
  width: 40.5vw;
  display: flex;
  justify-content:space-between;
`;

const UserChatWrapper = styled.div`
  text-align: center;
  display : flex;
  flex-direction : column;
  align-items: center;
  justify-content: space-around;
`;

const TimeText = styled.div`
  float: right;
  color: red;
  font-size: 30px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height : 50px;
`;

const UserChatSendButton = styled.button`
  margin-top: 30px;
  width: 4vw;
  height: 32px;
  border: 5px solid #fcb198;
  border-radius: 10px;
  background-color: white;
  &:hover{
    background-color: #fcb198;
  }
`;

const Line = styled.hr`
  border: 1px solid #fcb198;
  margin : 0;
`;
function Artist(props) {
  const [color, setColor] = useState("black");
  const [value, setValue] = useState(2.5);
  const [init, setInit] = useState(0);
  const [pen, setPen] = useState(true);
  const [re, setRe] = useState(0);
  const [chat, setChat] = useState("");
  const [time, setTime] = useState(60);
  const [selectCheck, setSelectCheck] = useState(false);

  useEffect(() => {
    socket.on("Dmessage", function (data) {
      console.log("Dmessage : " + data);
      if (data[1] == 0) {
        // 디렉터 힌트
        if (data[0].indexOf("힌트1") != -1) {
          console.log("힌트1 이 들어옴.");
          document.getElementById("D_chat").innerText = data[0];
        } else if (data[0].indexOf("힌트2") != -1) {
          console.log("힌트2 이 들어옴.");
          document.getElementById("D_chat").innerText =
            document.getElementById("D_chat").innerText + "\n" + data[0];
        } else if (data[0].indexOf("힌트3") != -1) {
          console.log("힌트3 이 들어옴.");
          document.getElementById("D_chat").innerText =
            document.getElementById("D_chat").innerText + "\n" + data[0];
        }
      } else if (data[1] == 1) {
        // 시스템 메세지
        document.getElementById("D_chat").innerText = data[0];
      }
    });

    /*socket.on("SelectComplete", function (data) {
      console.log("SelectCheck: " + data);
      setSelectCheck(data[1]);

      if (data[1] == true) {
        setInterval(() => {
          setTime((prevNumber) => prevNumber - 1);
        }, 1000);
      }
    });*/

    socket.on("gametime",function(data) {
      console.log(data);

      if(document.getElementById("gameTimer") != null){
        document.getElementById("gameTimer").innerText = data;

        if( data == "0"){
          // 투표 진행
        }
      }
    });

  }, []);

  const userChatOnClick = () => {
    socket.emit("Umessage", [props.code, props.nickname + " : " + chat]);
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
        <TopContainer>
          <Text id="gameTimer">{time}</Text>
        </TopContainer>
        <Line />
        <DirectorText id="D_chat">디렉터가 그림을 선택중입니다.</DirectorText>
        <Line />
        <Canvas
          color={color}
          stroke={value}
          init={init}
          pen={pen}
          re={re}
          code={props.code}
          nickname={props.nickname}
        />
        <Line />
        <UserChatWrapper>
          <UserChatList id="UserChatList"></UserChatList>
          <ChatWrap>
            <UserChat onChange={onChange} value={chat} />
            <UserChatSendButton onClick={userChatOnClick}>
              전송
            </UserChatSendButton>
          </ChatWrap>
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
