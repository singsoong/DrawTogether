import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: gray;
`;

const CavnasWrapper = styled.div`
  background-color: white;
  border: 1px solid black;
`;

function Canvas({ color, stroke, init }) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.5;
    const context = canvas?.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = 2;
    setCtx(context);
  }, [init]);

  const startDrawing = () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = stroke;
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  return (
    <Wrapper>
      <CavnasWrapper>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
        ></canvas>
      </CavnasWrapper>
    </Wrapper>
  );
}

export default Canvas;
