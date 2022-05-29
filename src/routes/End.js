import styled from "styled-components";
import imagee from "./../assets/images/inputmenubtn.png";
import goldmedal from "./../assets/images/goldmedal.png";
import { useHistory } from "react-router-dom";
import useSound from './BgmSounds';
import effectSound from './BgmEffect';
import BGM from './Audio/bgm1.mp3'
import React from 'react';
import { KakaoLinkDefault, KakaoLinkScrap } from "react-kakao-link"

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

const End = () => {

  const p1rank = "temp1";
  const p2rank = "temp2";
  const p3rank = "temp3";
  const p4rank = "temp4";

  const history = useHistory();
  const MainonClick = () => {
    history.push("/");
  } 
  const GalleryonClick = () => {
  }
  
  
  const template = {
    objectType: "feed",
    content: {
      title: "DrawTogether 같이 그릴까 ?",
      description: "#그림 #함께 #그리자 #취미 #소통 #친목",
      imageUrl:
        "http://13.209.48.229:3000/design/kakao/kakaomain.PNG",
      link: {
        mobileWebUrl: "",
        webUrl: "http://13.209.48.229:3000",
      },
    },
    social: {
      likeCount: 286,
      commentCount: 45,
      sharedCount: 845,
    },
    buttons: [
      {
        title: "웹으로 보기",
        link: {
          mobileWebUrl: "",
          webUrl: "http://13.209.48.229:3000",
        },
      },
      {
        title: "앱으로 보기",
        link: {
          mobileWebUrl: "",
          webUrl: "",
        },
      },
    ],
  }



  useSound(BGM, 1, 5000);//bgm 재생
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
                {p1rank}
              </RankBar1>
              <RankBar>{p2rank}</RankBar>
              <RankBar>{p3rank}</RankBar>
              <RankBar>{p4rank}</RankBar>
              <BtnWrap>
                <Btn onClick={MainonClick}>홈으로</Btn>
                <Btn onClick={GalleryonClick}>갤러리</Btn>
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
                    alt="카카오링크 보내기 버튼"
                  />
                </KakaoLinkDefault>
            </Content>
        </Container>
    )
}

export default End;