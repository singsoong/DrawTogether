import styled from "styled-components";
//import SettingBtn from "../components/SettingBtn";
import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { socket } from "../etc/Socket";
import Volume from "../components/volume";
import useSound from "./BgmSounds";
import effectSound from "./BgmEffect";
import BGM from "./Audio/bgm1.mp3";
import {soundStop,getsounds}from './BgmEffect';

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("../design/waiting/waiting_background.png");
  background-size: cover;
`;

const Header = styled.div`
  height: 10vh;
`;

const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  padding: 15px;
  border: 10px solid #f8a28b;
  display: flex;
  align-items: center;
  background-color: #fff5e9;
  justify-content: center;
`;

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 20px solid #ffd6c4;
  display: flex;
  align-items: center;
  background-color: #fff5e9;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 30px;
  width: 200px;
  height: 50px;
  text-align: center;
  margin-left: 300px;
`;

const CodeText = styled.h4`
  font-size: 30px;
  width: 300px;
  height: 50px;
  margin-left: 100px;
`;

const PlayerContainer = styled.div`
  width: 80%;
  height: 600px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

const Player = styled.div`
  border: 5px solid #f7968a;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  width: 400px;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const StartBtn = styled.div`
  border: 5px solid #f7968a;
  border-radius: 10px;
  cursor: pointer;
  width: 300px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: black;
  &:hover {
    background-color: #ffeacd;
  }
`;
const SettingBtn = styled.button`
  border: 5px solid #f7968a;
  border-radius: 10px;
  cursor: pointer;
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 40px;
  color: black;
  &:hover {
    background-color: #ffeacd;
  }
`;
const Timer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: block;
  padding: 10px 60px;
  border: 1px solid #718093;
  border-color: white;
  cursor: pointer;
`;

const ReadyBtn = styled(StartBtn)``;

const Waiting = (props) => {
  let flag = false;

  const history = useHistory();

  const [p1, setp1] = useState("empty");
  const [p2, setp2] = useState("empty");
  const [p3, setp3] = useState("empty");
  const [p4, setp4] = useState("empty");
  const [p5, setp5] = useState("empty");

  const [p1state, setp1state] = useState("wait");
  const [p2state, setp2state] = useState("wait");
  const [p3state, setp3state] = useState("wait");
  const [p4state, setp4state] = useState("wait");
  const [p5state, setp5state] = useState("wait");

  const [enterCode, setEnterCode] = useState("");
  const [nickname, setNickname] = useState("");

  const [color1, setColor1] = useState("white");
  const [color2, setColor2] = useState("white");
  const [color3, setColor3] = useState("white");
  const [color4, setColor4] = useState("white");
  const [color5, setColor5] = useState("white");
  const [myposition, setpMyposition] = useState(-1);

  const [vol, setVol] = useState(getsounds());

  console.log("sounds "+getsounds());
  console.log(vol);
  const start = () => {
    history.push("/game")
  };

  // 준비하기 btn 이벤트
  const onReady = () => {
    var temp = "wait";

    if (myposition == 1) {
      temp = p1state;
    } else if (myposition == 2) {
      temp = p2state;
    } else if (myposition == 3) {
      temp = p3state;
    } else if (myposition == 4) {
      temp = p4state;
    } else if (myposition == 5) {
      temp = p5state;
    }

    if (temp == "wait") {
      temp = "ready";
    } else {
      temp = "wait";
    }

    // 상태 업데이트 요청
    socket.emit("state", [enterCode, nickname, temp]);
  };

  // user 상태 세팅 함수
  const SettingState = (data) => {
    setp1state(data.p1.state);
    setp2state(data.p2.state);
    setp3state(data.p3.state);
    setp4state(data.p4.state);
    setp5state(data.p5.state);

    data.p1.state === "ready" ? setColor1("#ffe9e1") : setColor1("white");
    data.p2.state === "ready" ? setColor2("#ffe9e1") : setColor2("white");
    data.p3.state === "ready" ? setColor3("#ffe9e1") : setColor3("white");
    data.p4.state === "ready" ? setColor4("#ffe9e1") : setColor4("white");
    data.p5.state === "ready" ? setColor5("#ffe9e1") : setColor5("white");
  };

  // user 닉네임 세팅 함수
  const SettingUser = (data) => {
    if (data.p1.nickname != "") {
      if (data.p1.nickname == nickname) {
        setpMyposition(1);
      }
      setp1(data.p1.nickname);
    }

    if (data.p2.nickname != "") {
      if (data.p2.nickname == nickname) {
        setpMyposition(2);
      }
      setp2(data.p2.nickname);
    }
    if (data.p3.nickname != "") {
      if (data.p3.nickname == nickname) {
        setpMyposition(3);
      }
      setp3(data.p3.nickname);
    }
    if (data.p4.nickname != "") {
      if (data.p4.nickname == nickname) {
        setpMyposition(4);
      }
      setp4(data.p4.nickname);
    }
    if (data.p5.nickname != "") {
      if (data.p5.nickname == nickname) {
        setpMyposition(5);
      }
      setp5(data.p5.nickname);
    }
  };

  // 3명 이상의 user 가 모두 ready 인지 체크 함수
  const CheckAllready = (data) => {
    let count = 0;

    if (data.p1.nickname != "") {
      if (data.p1.state != "ready") {
        return false;
      } else {
        count++;
      }
    }

    if (data.p2.nickname != "") {
      if (data.p2.state != "ready") {
        return false;
      } else {
        count++;
      }
    }

    if (data.p3.nickname != "") {
      if (data.p3.state != "ready") {
        return false;
      } else {
        count++;
      }
    }

    if (data.p4.nickname != "") {
      if (data.p4.state != "ready") {
        return false;
      } else {
        count++;
      }
    }

    if (data.p5.nickname != "") {
      if (data.p5.state != "ready") {
        return false;
      } else {
        count++;
      }
    }

    console.log(count);

    if (count > 2) {
      return true;
    } else {
      return false;
    }
  };

  //카운트다운 후 게임 화면으로 전환

  const Counter = () => {
    let countNum = 2; // 초
    const temp = setInterval(() => {
      console.log("countNum : " + countNum);
      console.log("3. flag : " + flag);

      if (document.getElementById("timer") != null) {
        document.getElementById("timer").innerText =
          countNum + "초 후에 시작합니다";
      }

      if (flag == false) {
        console.log("stop interval");
        document.getElementById("timer").innerText = "";
        clearInterval(temp);
      }

      if (countNum == 0 && flag == true) {
        console.log("start game");
        clearInterval(temp);
        start();
      }
      countNum = countNum - 1;
    }, 1000);
  };

  useEffect(() => {
    // props 의 방입장 코드 및 닉네임 설정
    setEnterCode(props.code);
    setNickname(props.nickname);

    // user 입장마다 이벤트 발생
    socket.on("add", function (data) {
      if (data != null) {
        SettingUser(data);
        SettingState(data);
      }
    });

    // user 상태 변경시 마다 이벤트 발생
    socket.on("state", function (data) {
      if (data != null) {
        SettingState(data);
        if (CheckAllready(data) == true) {
          console.log("All user ready");
          flag = true;
          console.log("1. flag : " + flag);
          Counter();
        } else {
          console.log("All user not ready");
          flag = false;
          console.log("2. flag : " + flag);
        }
      }
    });

    // waiting 화면 들어올 시 , user 등록 요청
    if (enterCode != "" && nickname != "") {
      socket.emit("add", [enterCode, nickname]);
    }
  }, [nickname, enterCode]);

  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleModalCancel = () => setOpen(false);
  useEffect(() => {
    effectSound(1,vol);
    props.setMusicVol(vol);
    return ()=> {
      soundStop();//음악 중지
    };
  },[vol])//bgm 재생
  console.log(vol);
  return (
    <>
      <Container>
        <Header>
          <SettingBtn onClick={handleClick}>설정</SettingBtn>
          <Volume isOpen={isOpen} onCancel={handleModalCancel} vol={setVol}/>
        </Header>
        <Content>
          <Wrap>
            <Title>같이 그릴까?</Title>
            <CodeText>입장 코드 : {enterCode}</CodeText>
          </Wrap>
        </Content>
        <PlayerContainer>
          <Player color={"white"}>
            <ReadyBtn onClick={onReady}>준비하기</ReadyBtn>
            <Timer id="timer"></Timer>
          </Player>
          <Player color={color1}>
            {p1} : {p1state}
          </Player>
          <Player color={color2}>
            {p2} : {p2state}
          </Player>
          <Player color={color3}>
            {p3} : {p3state}
          </Player>
          <Player color={color4}>
            {p4} : {p4state}
          </Player>
          <Player color={color5}>
            {p5} : {p5state}
          </Player>
        </PlayerContainer>
      </Container>
    </>
  );
};

export default Waiting;