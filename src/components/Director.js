import { useState, useEffect } from "react";
import styled from "styled-components";
import Palette from "./Palette";
import { socket } from "../etc/Socket";
import inputBtnImage from "../assets/images/inputmenubtn.png";
import notDrawing from "../assets/images/notDrawing.png";
import sample1 from "../assets/images/sample1.jpg";
import sample2 from "../assets/images/sample2.jpg";
import sample3 from "../assets/images/sample3.jpg";
import sample4 from "../assets/images/sample4.jpg";
import sample5 from "../assets/images/sample5.jpg";
import sample6 from "../assets/images/sample6.jpg";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
`;

const PaletteContainer = styled.div`
  width: 20vw;
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  position: relative;
  cursor: not-allowed;
`;

const BlackContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 97vh;
  background-color: red;
  opacity: 0.5;
  pointer-events: none;
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

const Text = styled.span`
  font-size: 30px;
  margin-left: 300px;
`;

const ChatWrapper = styled.div`
  text-align: center;
`;

const ChatOkBtn = styled.button`
  margin-left: 50px;
  cursor: pointer;
`;

const Player = styled.div`
  background-color: white;
  border: 3px solid gray;
`;

const DirectorChat = styled.input`
  width: 400px;
  height: 40px;
  margin-left: 100px;
  margin-bottom: 10px;
  text-align: center;
  overflow: hidden;
`;

const ImageInput = styled.input.attrs({
  type: "file",
  id: "ex_file",
  accept: "image/jpg, image/png, image/jpeg",
})`
  display: none;
`;

const ImageInputWrap = styled.div`
  margin: 0 8px 0 8px;
  text-align: center;
`;

const BackgroundImage = styled.div`
  margin-top: 50px;
  cursor: pointer;
`;

const UserChatList = styled.div`
  width: 30vw;
  height: 15vh;
  background: white;
  overflow: auto;
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

const Player1 = styled.img`
  border: 3px solid gray;
  background-color: white;
  width: 25vw;
  height: 20vh;
`;
const Player2 = styled.img`
  border: 3px solid gray;
  background-color: white;
  width: 25vw;
  height: 20vh;
`;
const Player3 = styled.img`
  border: 3px solid gray;
  background-color: white;
  width: 25vw;
  height: 20vh;
`;
const Player4 = styled.img`
  border: 3px solid gray;
  background-color: white;
  width: 25vw;
  height: 20vh;
`;

const NotDrawing = styled.img`
  width: 25vw;
  height: 20vh;
  border: 3px solid gray;
`;

const DefaultImageBtn = styled.button``;

const UserChatSendButton = styled.button``;

const SelectCompleteBtn = styled.button`
  margin-left: 30px;
  background-color: aqua;
`;

const TimeText = styled.div`
  float: right;
  color: red;
  font-size: 30px;
`;

const TopContainer = styled.div`
  padding-top: 15px;
  padding-right: 20px;
`;

function Director(props) {
  const [color, setColor] = useState("black");
  const [value, setValue] = useState(2.5);
  const [init, setInit] = useState(0);
  const [chat_D, setChatD] = useState("");
  const [chat_U, setChatU] = useState("");
  const [myImage, setMyImage] = useState(inputBtnImage);
  const [images, setImage] = useState([0, 0, 0, 0]);
  const [canEdit, setcanEdit] = useState(false);
  const [count, setCount] = useState(1);
  const [time, setTime] = useState(60);
  const [selectCheck, setSelectCheck] = useState(false);
  const history = useHistory();

  const sampleImage = [sample1, sample2, sample3, sample4, sample5, sample6];

  const inputOnChange = (event) => {
    if (!selectCheck) {
      const nowSelectImageList = event.target.files;
      const nowImageUrl = URL.createObjectURL(nowSelectImageList[0]);
      setMyImage(nowImageUrl);
    }
  };
  const sendMessage_D = () => {
    if (count <= 3) {
      socket.emit("Dmessage", [props.code, "힌트" + count + ":" + chat_D, 0]); // 3번쨰 인자 : 0 디렉터 힌트 , 1 시스템 메세지
      setChatD(new String(""));
      setCount(new Number(count + 1));
    }

    let temp = new Boolean();

    if (count >= 3) {
      temp = true;
      setcanEdit(temp);
      setChatD(new String("더 이상 힌트를 입력할 수 없습니다."));
      //canEdit = true;
    } else {
      temp = false;
      setcanEdit(temp);
      //canEdit = false;
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    if (selectCheck) {
      setInterval(() => {
        setTime((prevNumber) => prevNumber - 1);
      }, 1000);
    }
  }, [selectCheck]);

  useEffect(() => {
    if (time == 0) {
      history.push("/end");
    }
  }, [time]);

  const userChatOnClick = () => {
    socket.emit("Umessage", [props.code, props.nickname + " : " + chat_U]);
    setChatU("");
  };

  const onChangeD = (event) => {
    const value = event.target.value;
    setChatD(value);
  };
  const onChangeU = (event) => {
    const value = event.target.value;
    setChatU(value);
  };

  const defaultImageOnClick = () => {
    if (!selectCheck) {
      let random = Math.floor(Math.random() * sampleImage.length);
      setMyImage(sampleImage[random]);
    }
  };

  const selctOnClick = () => {
    setSelectCheck(true);
    socket.emit("SelectComplete", [props.code, true]);
  };

  return (
    <Wrapper>
      <PaletteContainer>
        <BlackContainer>
          <Palette setColor={setColor} setValue={setValue} setInit={setInit} />
        </BlackContainer>
      </PaletteContainer>
      <ContentContainer>
        <TopContainer>
          <Text>디렉터 채팅</Text>
          <TimeText>{time}</TimeText>
        </TopContainer>

        <hr />
        <ChatWrapper>
          <DirectorChat
            value={chat_D}
            onChange={onChangeD}
            disabled={canEdit}
          />
          <ChatOkBtn onClick={sendMessage_D}>보내기</ChatOkBtn>
          <hr />
        </ChatWrapper>
        <ImageInputWrap>
          <label htmlFor="ex_file">
            <BackgroundImage>
              <img src={myImage} alt="myImage" width="500" height="300" />
            </BackgroundImage>
            <DefaultImageBtn onClick={defaultImageOnClick}>
              기본 이미지로 선택하기
            </DefaultImageBtn>
            <SelectCompleteBtn onClick={selctOnClick}>
              사진 선택완료
            </SelectCompleteBtn>
            <hr />
          </label>
          <ImageInput onChange={inputOnChange} />
        </ImageInputWrap>
        <UserChatWrapper>
          <UserChatList id="UserChatList"></UserChatList>

          <UserChat onChange={onChangeU} value={chat_U} />
          <UserChatSendButton onClick={userChatOnClick}>
            전송
          </UserChatSendButton>
        </UserChatWrapper>
      </ContentContainer>
      <PlayerContainer>
        {images[0] ? (
          <Player1 src={images[0]} alt="x" />
        ) : (
          <NotDrawing src={notDrawing} />
        )}
        {images[1] ? (
          <Player2 src={images[1]} alt="x" />
        ) : (
          <NotDrawing src={notDrawing} />
        )}
        {images[2] ? (
          <Player3 src={images[2]} alt="x" />
        ) : (
          <NotDrawing src={notDrawing} />
        )}
        {images[3] ? (
          <Player4 src={images[3]} alt="x" />
        ) : (
          <NotDrawing src={notDrawing} />
        )}
      </PlayerContainer>
    </Wrapper>
  );
}

export default Director;
