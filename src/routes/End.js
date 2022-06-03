import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Modal from "../components/RankModal";
import axios from "axios";
import imagee from "./../assets/images/inputmenubtn.png";
import goldmedal from "./../assets/images/goldmedal.png";
import { useHistory } from "react-router-dom";
import { socket } from "../etc/Socket";

const Container = styled.div`
  background-color : #ffeec3;
  width : 100%;
  height : 100vh;
`;
const BacktoMainBtn = styled.button`
  width: 20vw;
  height: 3vh;
  margin: 5% auto;
  cursor: pointer;
`;

const RankBar = styled.div`
  width : 500px;
  height : 50px;
  text-align: left;
  border: 3px solid #F7F1ED;
  line-height: 50px;
  padding-left : 10px;
  background-color : white;
`;
const RankBar1 = styled.div`
  width : 500px;
  height : 50px;
  text-align: left;
  border: 3px solid #F7F1ED;
  line-height: 50px;
  padding-left : 10px;
  background-color : white;
  border-bottom : 5px solid #fcb198;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  height : 150px;
  text-align: center;
  padding-bottom: 0vh;
`;

const Content = styled.div`
  display : flex;
  flex-direction : column;
  text-align: center;
  height: 700px;
  align-items: center;
  justify-content:space-around;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

const Btn = styled(BacktoMainBtn)`
  margin-top: 30px;
  width: 120px;
  height: 32px;
  border: 5px solid #fcb198;
  border-radius: 10px;
  background-color: white;
  &:hover{
    background-color: #fcb198;
  }
`;

const BtnWrap = styled.div`
  width: 300px;
  display : flex;
`;

const End = (props) => {

  const [player1Rank, setPlayer1Rank] = useState("empty");
  const [player2Rank, setPlayer2Rank] = useState("empty");
  const [player3Rank, setPlayer3Rank] = useState("empty");
  const [player4Rank, setPlayer4Rank] = useState("empty");
  const [showModal, setShowModal] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  
  useEffect(() => {
    socket.on("gameScore", function (data) {
      console.log(data);
    })
  });

  const history = useHistory();
  const MainonClick = () => {
    history.push("/");
  } 
  const GalleryonClick = () => {
  }   

    return (
        <Container>
            <Header>
              <Title>순위</Title>
            </Header>            
            <Content>
              <img 
                className="image" 
                alt="inputmenubtn" 
                src={imagee}
                width ="500px"
                height="300px"
              />
              <RankBar1>
                <img src={goldmedal} width ="40px" height="40px"/>
                {player1Rank}
              </RankBar1>
              <RankBar>{player2Rank}</RankBar>
              <RankBar>{player3Rank}</RankBar>
              <RankBar>{player4Rank}</RankBar>
              <BtnWrap>
                <Btn onClick={MainonClick}>홈으로</Btn>
                <Btn onClick={GalleryonClick}>갤러리</Btn>                
                <Btn onClick={openModal}>임시</Btn>
                <Modal 
                  open={showModal} 
                  close={closeModal} 
                  header="입장 코드를 입력해주세요" 
                ></Modal>
              </BtnWrap>
            </Content>

        </Container>
    )
}

export default End;