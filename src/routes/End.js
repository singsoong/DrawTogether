import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Modal from "../components/RankModal";
import goldmedal from "./../assets/images/goldmedal.png";
import { useHistory } from "react-router-dom";
import { socket } from "../etc/Socket";
import missingImage from ".././assets/images/missingImage.png";
import {soundStop,getsounds}from './BgmEffect';
import effectSound from "./BgmEffect";
import { KakaoLinkDefault, KakaoLinkScrap } from "react-kakao-link";

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
  background-color: #ffeec3;
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
  width: 400px;
  display : flex;
`;

const End = (props) => {
  const [showModal, setShowModal] = useState(true);
  const [index, setIndex] = useState(-1);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [forth, setForth] = useState("");
  const [topImage, setTopImage] = useState(missingImage);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    randerClick();
  };
    
  useEffect(() => {
    socket.emit("lookup", props.code);
    socket.on("lookup", function (data) {
      console.log(data);

      const rank1 = [
        [data.p1.nickname, data.p1.score, data.p1.director, data.p1.image],
        [data.p2.nickname, data.p2.score, data.p2.director, data.p2.image],
        [data.p3.nickname, data.p3.score, data.p3.director, data.p3.image],
        [data.p4.nickname, data.p4.score, data.p4.director, data.p4.image],
        [data.p5.nickname, data.p5.score, data.p5.director, data.p5.image]
      ];
      const rank2 = [0, 0, 0, 0];

      console.log(rank1);

      for (let i = 0; i < 4; i++) {
        for (let j = 0, temp = 0; j < 3-i; j++) {
          if (rank1[i][1] < rank1[i+1][1]) {
            temp = rank1[j];
            rank1[j] = rank1[j+1];
            rank1[j+1] = temp; 
          }
        }
      }

      console.log(rank1);
      
      for (let i = 0, j = 0; i < 4; i++) {
        if(!rank1[i][2]) {
          rank2[j] = rank1[i];
          j++;
        }
      }
  
      console.log(rank2);

      setTopImage(rank2[0][3]);
      setFirst(rank2[0][0]);
      setSecond(rank2[1][0]);
      setThird(rank2[2][0]);
      setForth(rank2[3][0]);
    });
  });

  const history = useHistory();
  const MainonClick = () => {
    history.push("/");
  } 
  const GalleryonClick = () => {
  }  
  const randerClick = () => {
    console.log("rerandering");
    setIndex(index + 1);
  } 
  const template = {
    objectType: "feed",
    content: {
      title: "DrawTogether ?????? ????????? ?",
      description: "#?????? #?????? #????????? #?????? #?????? #??????",
      imageUrl:
        "http://13.209.48.229:3000/design/kakao/kakaomain.PNG",
      link: {
        mobileWebUrl: "",
        webUrl: "http://drawtogether.ga/",
      },
    },
    social: {
      likeCount: 286,
      commentCount: 45,
      sharedCount: 845,
    },
    buttons: [
      {
        title: "????????? ??????",
        link: {
          mobileWebUrl: "",
          webUrl: "http://drawtogether.ga/",
        },
      },
      {
        title: "????????? ??????",
        link: {
          mobileWebUrl: "",
          webUrl: "",
        },
      },
    ],
  }
  const [vol, setVol] = useState(getsounds());
  effectSound(2,vol);//bgm ??????
  return (
    <Container>
        <Header>
          <Title>??????</Title>
        </Header>            
        <Content>
          <img 
            className="image" 
            alt="firstUser" 
            src={topImage}
            width ="500px"
            height="300px"
          />
          <RankBar1>
            <img src={goldmedal} width ="40px" height="40px"/>
            {first}
          </RankBar1>
          <RankBar>{second}</RankBar>
          <RankBar>{third}</RankBar>
          <RankBar>{forth}</RankBar>
          <BtnWrap>
            <Btn onClick={MainonClick}>?????????</Btn>
            <Btn onClick={GalleryonClick}>?????????</Btn>          
            <Modal 
              open={showModal} 
              close={closeModal} 
              header="??????" 
              code={props.code}
              nickname={props.nickname}
            ></Modal>
          </BtnWrap>
          <KakaoLinkDefault
            className="template"
            template={template}
            jsKey={"d8083b1b84b796d6d016e824b0f7da8f"}
          >
            <img 
              width = "50px"
              height= "50px"
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
              alt="??????????????? ????????? ??????"
            />
          </KakaoLinkDefault>
        </Content>
    </Container>
  )
}

export default End;