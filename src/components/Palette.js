import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 15vw;
  border: 1px solid black;
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 40px 40px;
  grid-template-rows: 40px 40px 40px 40px 40px;
  grid-gap: 1vw;
  margin-top: 1vh;
  justify-content: center;
`;

const ColorItem = styled.div`
  background-color: ${(props) => props.color || "black"};
  cursor: pointer;
  border: 1px solid black;
`;

const EraseAllBtn = styled.button`
  margin-bottom: 20px;
  background-color: white;
  cursor: pointer;
  margin-top: 20px;
`;

const SelectColor = styled.div`
  background-color: ${(props) => props.color || "black"};
  border: 1px solid white;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  margin-top: 5px;
`;

const ToolWrapper = styled.div``;

const Line = styled.hr``;

const RangeBar = styled.input``;

const ReturnBtn = styled.button`
  background-color: white;
  display: block;
  text-align: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Palette = (props) => {
  const [color, setColor] = useState("black");
  const [value, setValue] = useState(3);
  const [init, setInit] = useState(0);
  const [pen, setPen] = useState(true);
  const [ret, setRet] = useState(0);

  const PenBtn = styled.button`
    margin-right: 20px;
    background-color: ${pen ? "skyblue" : "white"};
  `;

  const EraserBtn = styled.button`
    margin-bottom: 10px;
    background-color: ${pen ? "white" : "skyblue"};
  `;

  const btnClick = (event) => {
    const targetColor = event.target.attributes.color.nodeValue;
    setColor(targetColor);
  };

  const eraseBtnOnClick = () => {
    const initValue = init + 1;
    setInit(initValue);
  };

  const onRangeChange = (event) => {
    const val = event.target.value;
    setValue(val);
  };

  const penOnClick = () => {
    setPen(true);
    props.pen(true);
  };

  const eraserOnClick = () => {
    setPen(false);
    props.pen(false);
  };

  const returnBtnOnClick = () => {
    setRet(ret + 1);
    props.re(ret + 1);
  };

  useEffect(() => {
    props.setColor(color);
  }, [color]);

  useEffect(() => {
    props.setValue(value);
  }, [value]);

  useEffect(() => {
    props.setInit(init);
  }, [init]);
  return (
    <Wrapper>
      <SelectColor color={color} />
      <Line />
      <GridContainer>
        <ColorItem onClick={btnClick} color="black" />
        <ColorItem onClick={btnClick} color="gray" />
        <ColorItem onClick={btnClick} color="red" />
        <ColorItem onClick={btnClick} color="orange" />
        <ColorItem onClick={btnClick} color="yellow" />
        <ColorItem onClick={btnClick} color="green" />
        <ColorItem onClick={btnClick} color="blue" />
        <ColorItem onClick={btnClick} color="darkblue" />
        <ColorItem onClick={btnClick} color="purple" />
        <ColorItem onClick={btnClick} color="aqua" />
        <ColorItem onClick={btnClick} color="chocolate" />
        <ColorItem onClick={btnClick} color="cornsilk" />
        <ColorItem onClick={btnClick} color="deeppink" />
        <ColorItem onClick={btnClick} color="IndianRed" />
        <ColorItem onClick={btnClick} color="Khaki" />
      </GridContainer>
      <BtnContainer>
        <EraseAllBtn onClick={eraseBtnOnClick}>모두 지우기</EraseAllBtn>
        <ReturnBtn onClick={returnBtnOnClick}>되돌리기</ReturnBtn>
      </BtnContainer>

      <Line />
      <ToolWrapper>
        <PenBtn onClick={penOnClick} select={pen}>
          펜
        </PenBtn>
        <EraserBtn onClick={eraserOnClick} select={pen}>
          지우개
        </EraserBtn>
        <RangeBar
          type="range"
          min="0.1"
          max="20.0"
          step="any"
          value={value}
          onChange={onRangeChange}
        />
      </ToolWrapper>
    </Wrapper>
  );
};

export default Palette;
