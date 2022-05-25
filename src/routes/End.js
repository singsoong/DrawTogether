import styled from "styled-components";
import imagee from "./../assets/images/inputmenubtn.png";
import { useHistory } from "react-router-dom";


const BacktoMainBtn = styled.button`
  display: block;
  width: 20vw;
  height: 3vh;
  margin: 5% auto;
  cursor: pointer;
`;

const RankBar = styled.div`
  text-align: left;
  padding-left: 2vw;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 20vw;
  margin-right: 20vw;
  margin-top: 3vh;
  border: 1px solid black;
`;

const Header = styled.div`
  text-align: center;
  padding-bottom: 0vh;
`;

const Content = styled.div`
  text-align: center;
  height: 50vh;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

const Btn = styled(BacktoMainBtn)``;



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

    return (
        <contain>
            <Header>
              <Title>순위</Title>
            </Header>            
            <Content>
              <img 
                className="image" 
                alt="inputmenubtn" 
                src={imagee}
              />
              <RankBar>{p1rank}</RankBar>
              <RankBar>{p2rank}</RankBar>
              <RankBar>{p3rank}</RankBar>
              <RankBar>{p4rank}</RankBar>
              <Btn onClick={MainonClick}>홈으로</Btn>
              <Btn onClick={GalleryonClick}>갤러리</Btn>
            </Content>

        </contain>
    )
}

export default End;