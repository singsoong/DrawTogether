import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { socket } from "../etc/Socket";

const Wrapper = styled.div`
  background-color: gray;
`;

const CavnasWrapper = styled.div`
  background-color: white;
`;

function Canvas({ color, stroke, init, pen, re, image ,code ,nickname }) {
  const canvasRef = useRef(null);
  const [cvs, setCvs] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pencil, setPencil] = useState(true);
  const [ret, setRet] = useState(0);
  const [storeArr, setStoreArr] = useState([]);
  const [index, setIndex] = useState(-1);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.5;
    setCvs(canvas);
    const context = canvas?.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = 2;
    setCtx(context);
  }, [init]);

  useEffect(() => {
    setPencil(pen);
  }, [pen, pencil]);

  useEffect(() => {
    if (storeArr.length == 0) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 0.5;
      canvas.height = window.innerHeight * 0.5;
      setCvs(canvas);
    } else {
      if (storeArr.length != 0) {
        ctx.putImageData(storeArr[storeArr.length - 1], 0, 0);
      }
      storeArr.pop();
    }
  }, [re]);

  const startDrawing = () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = stroke;
    setIsDrawing(true);
    storeArr.push(ctx.getImageData(0, 0, cvs.width, cvs.height));

    setIndex(index + 1);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    if (storeArr.length != 0) {
      const img = cvs.toDataURL("image/png");
      //setImageUrl(img);
      //image(img);

      socket.emit("image", [code,nickname,img]);
    }
  };

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (pencil) {
        if (!isDrawing) {
          ctx.beginPath();
          ctx.moveTo(offsetX, offsetY);
        } else {
          ctx.lineTo(offsetX, offsetY);
          ctx.stroke();
        }
      } else if (!pencil) {
        if (isDrawing) {
          ctx.clearRect(
            offsetX - ctx.lineWidth / 2,
            offsetY - ctx.lineWidth / 2,
            ctx.lineWidth,
            ctx.lineWidth
          );
        }
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