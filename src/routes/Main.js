import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../component/Button";
import EButton from "../component/EnterButton";
import Modal from "../component/Modal";
import styles from "../css/Waiting.module.css";


class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  myChangeHandler = evt => {
    this.setState({ username: evt.target.value });
  };

  doSave = () => {
    const { username } = this.state;
    alert(username);
  };
}


function Main() {
  const [code, SetCode] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const shoot = () => {
  //   fetch("http://localhost:3001/api")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };

  const startBtn = () => {
    SetCode(Math.floor(Math.random() * 900000) + 100000);
  };

  useEffect(startBtn, []);

  return (
    <>
      <div>
        <TemplateBlock>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;같이 그릴까?
          <button className={styles.settingBtn} onClick={openModal}>
            설정
          </button>
          <Wrapper>
          <Input onChange={About.myChangeHandler}></Input>
          <Link  style={{ textDecoration: 'none' }} to={`./waiting/${code}`}>
            <Button className="btn btn-primary" onClick={About.doSave}>방 만들기</Button>
          </Link>
          <EButton onClick={openModal}>입장하기</EButton>
          <Modal
            open={modalOpen}
            close={closeModal}
            header="닉네임을 입력해주세요"
          ></Modal>
          </Wrapper>
        </TemplateBlock>
      </div>
    </>
  );
}





const TemplateBlock = styled.div`
  width: 1600px; /*가로*/
  height: 900px; /*세로*/
  text-align: center;
  font-size: 5rem;
  color: black;
  line-height: 400px;


  background: pink;
  border: 2px solid black;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: auto; /* 페이지 중앙 */

  margin-top: 16px;
  margin-bottom: 16px;
`;

const Wrapper = styled.section`
line-height: 100px;
`;

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "390px",
  maxLength: "10",
}))`
  width: ${(props) => props.size};
  height: 50px;
  align-items: center;
`;






export default Main;