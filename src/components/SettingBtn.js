import styled from "styled-components";

const Btn = styled.button`
  padding: 5px 10px;
  float: right;
  margin-right: 8vw;
  margin-top: 2vh;
  cursor: pointer;
`;

function SettingBtn() {
  return (
    <div>
      <Btn>설정</Btn>
    </div>
  );
}

export default SettingBtn;
