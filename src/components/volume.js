import ReactModal from "react-modal";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "./volume.css";
import BgmSounds from "../routes/BgmSounds";
import {getsounds} from "../routes/BgmEffect";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
  color: white;
  line-height: 50px;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 80%;
  width: 15rem;
  height: 15%;
  padding: 16px;
  background: rgb(25, 31, 44);
  border-radius: 10px;
  text-align: center;
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

export const MyModal = ({ isOpen, onCancel, vol }) => {
  const handleClickCancel = () => {
    onCancel();
  };
  const [volume, setVolume] = useState(getsounds());
  const [muted, setMuted] = useState(false);
  const [finalVolume, setFinalVolume] = useState(0);
  const [final, setFinal] = useState(0);

  useEffect(() => {
    setFinalVolume(muted ? 0 : volume ** 1);
  }, [volume]);
  useEffect(() => {
    const temp = finalVolume.toFixed(1);
    setFinal(temp);
    vol(temp);
  }, [finalVolume]);
  return (
    <ReactModal isOpen={isOpen}>
      <Background>
        <ModalContainer>
          <div>Volume Setting</div>
          <CloseBtn onClick={handleClickCancel}>&times;</CloseBtn>
          <section>
            <input
              type="range"
              min={0}
              max={1}
              step={0.005}
              value={volume}
              onChange={(event) => {
                setVolume(event.target.valueAsNumber);
              }}
            />
            <button onClick={() => setMuted((m) => !m)}>
              {muted ? "muted" : "unmuted"}
            </button>
          </section>
          <section>
            <p>현재 볼륨: {finalVolume.toFixed(1) * 100}%</p>
          </section>
        </ModalContainer>
      </Background>
    </ReactModal>
  );
};

export const finalVolume = () => {
  return MyModal.final.toFixed(1);
};
export default MyModal;