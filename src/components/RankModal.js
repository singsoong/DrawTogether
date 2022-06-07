import { click } from "@testing-library/user-event/dist/click";
import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { socket } from "../etc/Socket";
import missingImage from ".././assets/images/missingImage.png";

const modalShow = keyframes`
    from{
        opacity: 0;
        margin-top: -50px;
    }
    to{
        opacity: 1;
        margin-top: 0;
    }
`;

const modalBgShow = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

const OpenModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  animation: ${modalBgShow} 0.3s;
`;

const Section = styled.div`
  width: 90%;
  max-width: 1450px;
  margin: 0 auto;
  border-radius: 10px;
  border : 5px solid #f7968a;
  background-color: white;
  animation: ${modalShow} 0.3s;
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: white;
  font-weight: 700;
  text-align: center;
  padding-left: 50px;
`;

const CloseBtn = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
`;

const Main = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f7968a;
  border-top: 1px solid #f7968a;
  text-align: center;
`;

const Footer = styled.div`
  padding: 12px 16px;
  text-align: center;
`;

const OkBtn = styled.button`
  background-color: white;
  border : 5px solid #f7968a;
  border-radius : 10px;
  width : 20%;
  color: #f7968a;
  cursor: pointer;

  &:hover{
    border: 5px solid #f7968a;
    background-color: #f7968a;
    color: white;
  }
`;

export const sendImage = () => {
  
}

const RankModal = (props) => {
  const { open, close, header, code } = props;
  const [images, setImage] = useState([0, 0, 0, 0]);
  const [checkedItem, setCheckedItem] = useState(new Set());
  const [indexImage, setIndexImage] = useState(1);
  const [score, setScore] = useState([0, 0, 0, 0, 0]);
  const [directorImage, setDirectorImage] = useState(0);
  const [index, setIndex] = useState(-1);

  const radioItemHandler = (e) => {    
    // setIndex(index+1); 
    setCheckedItem(e.target.value); 
    let arr = score;
    arr[indexImage] = e.target.value;
    setScore(arr);
    console.log(arr,score,e.target.value, indexImage);
  }

  //임시리셋
  const reset = () => {
    setIndexImage(1);
  }

  const clo = close;

  const nextButtonHandler = () => {
    console.log(score);
    if (images[indexImage+1] == null) {
      socket.emit("gameScore", [score, code]);
      clo();
      // console.log("close");
    } else {
      setIndexImage(indexImage + 1);
      console.log("+1");
    }
    console.log(images[indexImage + 1]);    
  }  

  useEffect(() => {
    socket.on("image", function (data) {
      console.log(data);

      let arr = new Array(images);
      let tempDirectorImage = directorImage;

      let flag1 = false;
      let flag2 = false;
      let flag3 = false;
      let flag4 = false;
      let flag5 = false;

      for (let i = 0; i < 5; i++) {
        if (flag1 == false) {
          if (data.p1.director != true) {
            // console.log("user1 image load success");
            arr[0] = data.p1.image;
            flag1 = true;
            continue;
          } else {
            // console.log("director1 image load success");
            arr[0] = missingImage;
            tempDirectorImage = data.p1.image;
            flag1 = true;
          }
        }
        if (flag2 == false) {
          if (data.p2.director != true) {
            // console.log("user2 image load success");
            arr[1] = data.p2.image;
            flag2 = true;
            continue;
          } else {
            // console.log("director2 image load success");
            arr[1] = missingImage;
            tempDirectorImage = data.p2.image;
            flag2 = true;
          }
        }
        if (flag3 == false) {
          if (data.p3.director != true) {
            // console.log("user3 image load success");
            arr[2] = data.p3.image;
            flag3 = true;
            continue;
          } else {
            // console.log("director3 image load success");
            arr[2] = missingImage;
            tempDirectorImage = data.p3.image;
            flag3 = true;
          }
        }
        if (flag4 == false) {
          if (data.p4.director != true) {
            // console.log("user4 image load success");
            arr[3] = data.p4.image;
            flag4 = true;
            continue;
          } else {
            // console.log("director4 image load success");
            arr[3] = missingImage;
            tempDirectorImage = data.p4.image;
            flag4 = true;
            continue;
          }
        }
        if (flag5 == false) {
          if (data.p5.director != true) {
            // console.log("user5 image load success");
            arr[4] = data.p5.image;
            flag5 = true;
            continue;
          } else {
            // console.log("director5 image load success");
            arr[4] = missingImage;
            tempDirectorImage = data.p5.image;
            flag5 = true;
          }
        }
      }

      setImage(arr);
      setDirectorImage(tempDirectorImage);
      console.log(images, directorImage);
    });
  }, []);

  return (
    <>
      {open ? (
        <OpenModal>
          <Section>
            <Header>
              {header}
              <CloseBtn onClick={close}>&times;</CloseBtn>
            </Header>
            <Main>
              <div style={{display: 'flex'}}>
                <div>
                  <h1>
                    ori
                  </h1>
                  <img
                    className="OriPic"
                    alt="OriPic"
                    src={directorImage}
                    width="500px"
                    height="300px"
                  ></img>
                </div>                
                  {checkedItem}점
                <div>
                  <h1>
                    ply
                  </h1>
                  <img
                    className="plyic"
                    alt="plyPic"
                    src={images[indexImage]}
                    width="500px"
                    height="300px"
                  ></img>
                </div>
              </div>              
            </Main>
            <Footer>
              <div className="radio" style={{display: 'flex'}}>
                <input
                  type="radio"
                  value="1"
                  checked={checkedItem === "1"}
                  onChange={radioItemHandler}
                />
                <label>
                  1점
                </label>
                <input
                  type="radio"
                  value="2"
                  checked={checkedItem === "2"}
                  onChange={radioItemHandler}
                />
                <label>
                  2점
                </label>
                <input
                  type="radio"
                  value="3"
                  checked={checkedItem === "3"}
                  onChange={radioItemHandler}
                />
                <label>
                  3점
                </label>
                <input
                  type="radio"
                  value="4"
                  checked={checkedItem === "4"}
                  onChange={radioItemHandler}
                />
                <label>
                  4점
                </label>
                <input
                  type="radio"
                  value="5"
                  checked={checkedItem === "5"}
                  onChange={radioItemHandler}
                />
                <label>
                  5점
                </label>
              </div>
              <div>
                <OkBtn onClick={nextButtonHandler}>제출</OkBtn>
                <OkBtn onClick={reset}>리셋</OkBtn>
              </div>
            </Footer>
          </Section>
        </OpenModal>
      ) : null}
    </>
  );
};

export default RankModal;
