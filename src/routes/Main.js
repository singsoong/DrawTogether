import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import Button from '../component/Button';

function Main() {
  return (
    <>
      <div>
      <TemplateBlock>{}
        대기화면
        <Link to="./waiting"> 
  <Button> 시작 </Button>
</Link>
      </TemplateBlock>
      </div>
    </>
  );
}




const TemplateBlock = styled.div`
width: 1600px; /*가로*/
height: 900px; /*세로*/
align-items: center;
line-height: 400px;
font-size: 5rem;
color: black;


position: relative; 
background : pink;
border : 2px solid black;
border-radius: 16px;
box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

margin: 0 auto; /* 페이지 중앙 */

margin-top: 16px;
margin-bottom: 16px;
flex-direction: column;
`;





export default Main;