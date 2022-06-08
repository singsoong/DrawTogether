import { useState, useEffect } from "react";
import styled from "styled-components";
import Canvas from "./Canvas";
import Palette from "./Palette";
import { socket } from "../etc/Socket";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";


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
  border-left: 1px solid #fcb198;
  border-right: 1px solid #fcb198;
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
  width: 100px;
`;

const DirectorText = styled.div`
  height: 30px;
  padding: 10px;
  text-align: center;
  line-height: 30px;
`;

const Player = styled.div`
  background-color: white;
  border: 3px solid gray;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserChatList = styled.div`
  width: 40vw;
  height: 15vh;
  background: white;
  overflow: auto;
  border: 5px solid #fcb198;
  border-radius: 10px;
  margin-top: 20px;
  text-align: left;
  padding-top: 20px;
  padding-left: 20px;
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
  justify-content: space-between;
`;

const UserChatWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const UserChatSendButton = styled.button`
  margin-top: 30px;
  width: 4vw;
  height: 32px;
  border: 5px solid #fcb198;
  border-radius: 10px;
  background-color: white;
  &:hover {
    background-color: #fcb198;
  }
`;

const Line = styled.hr`
  border: 1px solid #fcb198;
  margin: 0;
`;

const PlayerButton = styled.button`
  background-color: white;
  border: 5px solid #fcb198;
  border-radius: 10px;
  &:hover {
    background-color: #fcb198;
  }
`;

const Player1 = styled.img`
  background-color: white;
  border: 3px solid gray;
  border-radius: 10px;
  width: 25vw;
  height: 20vh;
`;

const Player2 = styled.img`
  background-color: white;
  border: 3px solid gray;
  border-radius: 10px;
  width: 25vw;
  height: 20vh;
`;

const Player3 = styled.img`
  background-color: white;
  border: 3px solid gray;
  border-radius: 10px;
  width: 25vw;
  height: 20vh;
`;

const Player4 = styled.img`
  background-color: white;
  border: 3px solid gray;
  border-radius: 10px;
  width: 25vw;
  height: 20vh;
`;

function Artist(props) {
  const [color, setColor] = useState("black");
  const [value, setValue] = useState(2.5);
  const [init, setInit] = useState(0);
  const [pen, setPen] = useState(true);
  const [re, setRe] = useState(0);
  const [chat, setChat] = useState("");
  const [time, setTime] = useState(60);
  const [images, setImage] = useState([]);
  const [player1, setPlayer1] = useState(false);
  const [player2, setPlayer2] = useState(false);
  const [player3, setPlayer3] = useState(false);
  const [player4, setPlayer4] = useState(false);
  const history = useHistory();


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

    socket.on("gametime", function (data) {
      console.log(data);

      if (document.getElementById("gameTimer") != null) {
        document.getElementById("gameTimer").innerText = data;

        if (data == "0") {
          history.push("/end");
          // 투표 진행
        }
      }
    });

    socket.on("image", function (data) {
      console.log(data);

      let arr = new Array(images);

      let flag1 = false;
      let flag2 = false;
      let flag3 = false;
      let flag4 = false;
      let flag5 = false;

      for (let i = 0; i < 4; i++) {
        if (data.p1.director != true && flag1 == false) {
          arr[i] = data.p1.image;
          flag1 = true;
          continue;
        }
        if (data.p2.director != true && flag2 == false) {
          arr[i] = data.p2.image;
          flag2 = true;
          continue;
        }
        if (data.p3.director != true && flag3 == false) {
          arr[i] = data.p3.image;
          flag3 = true;
          continue;
        }
        if (data.p4.director != true && flag4 == false) {
          arr[i] = data.p4.image;
          flag4 = true;
          continue;
        }
        if (data.p5.director != true && flag5 == false) {
          arr[i] = data.p5.image;
          flag5 = true;
          continue;
        }
      }

      setImage(arr);
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

  const player1OnClick = () => {
    setPlayer1(true);
    if (!images[0]) {
      Swal.fire({
        icon: "error",
        title: "아직 그림을 안그렸어요!",
      });
      setPlayer1(false);
    }
  };

  const player2OnClick = () => {
    setPlayer2(true);
    if (!images[1]) {
      Swal.fire({
        icon: "error",
        title: "아직 그림을 안그렸어요!",
      });
      setPlayer2(false);
    }
  };

  const player3OnClick = () => {
    setPlayer3(true);
    if (!images[2]) {
      Swal.fire({
        icon: "error",
        title: "아직 그림을 안그렸어요!",
      });
      setPlayer3(false);
    }
  };

  const player4OnClick = () => {
    if (!images[3]) {
      Swal.fire({
        icon: "error",
        title: "아직 그림을 안그렸어요!",
      });
      setPlayer4(false);
    }
    setPlayer4(true);
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
        {player1 ? (
          <Player1 src={images[0]} alt="아직 그림을 그리기 전입니다." />
        ) : (
          <Player>
            <PlayerButton onClick={player1OnClick}>그림 보기</PlayerButton>
          </Player>
        )}
        {player2 ? (
          <Player2 src={images[1]} alt="아직 그림을 그리기 전입니다." />
        ) : (
          <Player>
            <PlayerButton onClick={player2OnClick}>그림 보기</PlayerButton>
          </Player>
        )}
        {player3 ? (
          <Player3 src={images[2]} alt="아직 그림을 그리기 전입니다." />
        ) : (
          <Player>
            <PlayerButton onClick={player3OnClick}>그림 보기</PlayerButton>
          </Player>
        )}
        {player4 ? (
          <Player3 src={images[3]} alt="아직 그림을 그리기 전입니다." />
        ) : (
          <Player>
            <PlayerButton onClick={player4OnClick}>그림 보기</PlayerButton>
          </Player>
        )}
      </PlayerContainer>
    </Wrapper>
  );
}

export default Artist;
