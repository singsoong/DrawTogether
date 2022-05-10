import styled from "styled-components";
import SettingBtn from "../components/SettingBtn";
import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {socket} from "../etc/Socket";

const Container = styled.div`
  padding-left: 10vw;
`;

const Header = styled.div`
  height: 10vh;
`;

const Content = styled.div`
  padding-left: 10vw;
  height: 20vh;
`;

const Title = styled.h1`
  display: inline;
`;

const CodeText = styled.h4`
  margin-left: 10vw;
  display: inline;
`;

const PlayerContainer = styled.div`
  display: grid;
  grid-template-columns: 25vw 25vw 25vw;
  grid-template-rows: 25vh 25vh;
  grid-gap: 3vw;
  text-align: center;
`;

const Player = styled.div`
  padding-left: 3vw;
  padding-right: 3vw;
  padding-top: 3vh;
  border: 1px solid #718093;
  background-color: ${(props) => props.color};
`;

const StartBtn = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: block;
  padding: 10px 60px;
  border: 1px solid #718093;
  cursor: pointer;
`;

const ReadyBtn = styled(StartBtn)``;

const Waiting = (props) => {

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

  const startClick = () => {
    history.push("/game");
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
  const SettingState = (data)=>{
    setp1state(data.p1.state);
    setp2state(data.p2.state);
    setp3state(data.p3.state);
    setp4state(data.p4.state);
    setp5state(data.p5.state);
        
    data.p1.state === "ready" ? setColor1("yellow") : setColor1("white");
    data.p2.state === "ready" ? setColor2("yellow") : setColor2("white");
    data.p3.state === "ready" ? setColor3("yellow") : setColor3("white");
    data.p4.state === "ready" ? setColor4("yellow") : setColor4("white");
    data.p5.state === "ready" ? setColor5("yellow") : setColor5("white");
  }

  // user 닉네임 세팅 함수
  const SettingUser = (data)=>{
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
  }

  // 3명 이상의 user 가 모두 ready 인지 체크 함수
  const CheckAllready = (data)=>{

    let count =0;
    
    if (data.p1.nickname != "") {
      if (data.p1.state != "ready") {
        return false;
      }else{
        count++;
      }
    }

    if (data.p2.nickname != "") {
      if (data.p2.state != "ready") {
        return false;
      }else{
        count++;
      }
    }

    if (data.p3.nickname != "") {
      if (data.p3.state != "ready") {
        return false;
      }else{
        count++;
      }
    }

    if (data.p4.nickname != "") {
      if (data.p4.state != "ready") {
        return false;
      }else{
        count++;
      }
    }

    if (data.p5.nickname != "") {
      if (data.p5.state != "ready") {
        return false;
      }else{
        count++;
      }
    }

    //console.log(count);
    
    if(count > 2){
      return true;
    }else {
      return false;
    }
  }

  useEffect(() => {

    // props 의 방입장 코드 및 닉네임 설정
    setEnterCode(props.code);
    setNickname(props.nickname);

    // user 입장마다 이벤트 발생
    socket.on("add", function (data) {
      if(data != null){
        SettingUser(data);
        SettingState(data);
      }
    });
    
    // user 상태 변경시 마다 이벤트 발생
    socket.on("state", function (data) {
      if(data != null){
        SettingState(data);
        if( CheckAllready(data) == true ){
          console.log("All user ready");
        }else {
          console.log("All user not ready");
        }
      }
    });
    
    // waiting 화면 들어올 시 , user 등록 요청
    if(enterCode != "" && nickname != ""){
      socket.emit("add", [enterCode, nickname]);
    }
  }, [nickname, enterCode]);

  return (
    <>
      <Container>
        <Header>
          <SettingBtn>설정</SettingBtn>
        </Header>
        <Content>
          <Title>같이 그릴까?</Title>
          <CodeText>입장 코드 : {enterCode}</CodeText>
        </Content>
        <PlayerContainer>
          <Player>
            <StartBtn onClick={startClick}>시작하기</StartBtn>
            <ReadyBtn onClick={onReady}>준비하기</ReadyBtn>
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