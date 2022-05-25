import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 15vw;
  border: 5px solid #fcb198;
  border-radius: 10px;
  text-align: center;
  background-color : #fff9eb;
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
  border: 1px solid #fcb198;
  border-radius: 10px;
`;

const SelectColor = styled.div`
  background-color: ${(props) => props.color || "black"};
  border: 1px solid #fcb198;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom : 8px;
  border-radius: 10px;
`;

const ToolWrapper = styled.div`
  height : 60px;
  display : flex;
  align-items: center;
  justify-content: space-around;
`;

const Line = styled.hr`
  border: 1px solid #fcb198;
  margin : 0;
`;

const RangeBar = styled.input`
  width : 40%;
`;

const EraseAllBtn = styled.button`
  background-color: white;
  cursor: pointer;
  width  : 40%;
  height : 40px;
  border: 1px solid #fcb198;
  border-radius: 10px;
  &:hover{
    background-color: #fcb198;
  }
`;

const ReturnBtn = styled.button`
  background-color: white;
  display: block;
  text-align: center;
  width  : 40%;
  height : 40px;
  border: 1px solid #fcb198;
  border-radius: 10px;
  &:hover{
    background-color: #fcb198;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height : 80px;
`;

const Palette = (props) => {
  const [color, setColor] = useState("black");
  const [value, setValue] = useState(3);
  const [init, setInit] = useState(0);
  const [pen, setPen] = useState(true);
  const [ret, setRet] = useState(0);

  const PenBtn = styled.button`
    background-color: ${pen ? "#fcb198" : "white"};
    border: 1px solid #fcb198;
    border-radius: 10px;
    width : 25%;
    height : 30px;
  `;

  const EraserBtn = styled.button`
    background-color: ${pen ? "white" : "#fcb198"};
    border: 1px solid #fcb198;
    border-radius: 10px;
    width : 25%;
    height : 30px;
    overflow : hidden;
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
    props.re(ret+1);
    setRet(ret+1);
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
          팬
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
