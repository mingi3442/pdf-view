"use client";
import axios from "axios";
import Image from "next/image";
import { type } from "os";
import * as React from "react";
import Draggable, { DraggableData } from "react-draggable";
import { styled } from "styled-components";

interface IElementProps {
  x: number | undefined;
  y: number | undefined;
  width: number | undefined;
  height: number | undefined;
  type?: string; // TextInput, ImageInput, Text, Image
  value?: string;
  page?: number;
}

export default function TestPage() {
  const [image] = React.useState(
    "https://images.unsplash.com/photo-1691145697744-ba94b6950592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  );
  const [pdf] = React.useState("https://www.africau.edu/images/default/sample.pdf");
  const [box, setBox] = React.useState<boolean>(false);
  const draggableBoxRef = React.useRef<HTMLHeadingElement>(null);
  const [boxPosition, setBoxPosition] = React.useState<IElementProps>({
    x: draggableBoxRef?.current?.offsetLeft,
    y: draggableBoxRef?.current?.offsetTop,
    width: draggableBoxRef.current?.offsetWidth,
    height: draggableBoxRef.current?.offsetHeight,
  });
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const onClickBoxInformation = () => {
    console.log("position : ", boxPosition);
    // console.log("height : ", draggableBoxRef.current?.offsetHeight);
  };

  const onClickSubmit = async () => {
    await axios
      .post("http://localhost:8080/generate", {
        data: {
          template: pdf,
          element: boxPosition,
        },
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        console.log(URL.createObjectURL(blob));
        console.log(res);
        // console.log(res.data);
      });
    // await axios
    //   .post(
    //     "http://localhost:8080/generate",
    //     {
    //       // {responseType: "arraybuffer"},
    //       data: {
    //         template: image,
    //         element: boxPosition,
    //       },
    //     },
    //     {
    //       responseType: "arraybuffer", // Tell Axios to treat the response as ArrayBuffer
    //       headers: {
    //         "Content-Type": "application/octet-stream", // Set the appropriate Content-Type header
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     const blob = new Blob([res.data], { type: "application/pdf" });
    //     console.log(URL.createObjectURL(blob));
    //     console.log(res);
    //   });
  };

  React.useEffect(() => {
    // axios.get("http://localhost:8080").then((res) => console.log(res));
  }, []);

  return (
    <>
      {" "}
      <div style={{ width: "500px", height: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
        <div>
          <button onClick={onClickBoxInformation}>INPUT Information </button>
        </div>
        <div>
          <button onClick={() => setBox((prev) => !prev)}>Create INPUT</button>
        </div>
        <div>
          <button onClick={onClickSubmit}>Submit</button>
        </div>
      </div>
      <div style={{ minWidth: "100vw", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 700,
            height: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "gray",
            position: "absolute",
          }}
        >
          {/* <Image alt="image" width={700} height={400} src={image} /> */}
          {box && <TestComponent currentRef={draggableBoxRef} setRef={setBoxPosition} refValue={boxPosition} />}
        </div>

        {/* <Document
          file={pdf}
          // onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page />
        </Document> */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* <iframe frameBorder="0" style={{ width: "100%", height: "100%" }} title="pdf" src={pdf}></iframe> */}
        </div>
      </div>
    </>
  );
}

const TestComponent = ({
  currentRef,
  setRef,
  refValue,
}: {
  currentRef: React.RefObject<HTMLHeadingElement>;
  setRef: React.Dispatch<React.SetStateAction<IElementProps>>;
  refValue: IElementProps;
}) => {
  // const TestComponent = ({ func, boundRef }: { func: Dispatch<SetStateAction<any[]>>; boundRef?: React.RefObject<HTMLHeadingElement> }) => {

  // console.log(currentRef?.current?.offsetTop);
  // const [position, setPosition] = React.useState({
  //   x: currentRef?.current?.offsetLeft,
  //   y: currentRef?.current?.offsetTop,
  //   width: currentRef.current?.offsetWidth,
  //   height: currentRef.current?.offsetHeight,
  // }); // box의 포지션 값
  // // 업데이트 되는 값을 set 해줌
  // const [value, setValue] = React.useState("");

  React.useEffect(() => {}), [currentRef];

  const trackPos = (data: DraggableData) => {
    setRef({
      x: data.x + (currentRef?.current?.offsetLeft as number),
      y: data.y + (currentRef?.current?.offsetTop as number),
      width: currentRef.current?.offsetWidth,
      height: currentRef.current?.offsetHeight,
      type: refValue?.type,
      value: refValue?.value,
    } as IElementProps);
  };

  return (
    <>
      {currentRef && (
        <Draggable nodeRef={currentRef} onDrag={(e, data) => trackPos(data)} bounds={"parent"}>
          <TestBox ref={currentRef}>
            <input value={refValue?.value ? refValue?.value : ""} onChange={(e) => setRef((prevValue) => ({ ...prevValue, value: e.target.value }))} type="text" />
            {/* <div>BOX</div>
            <div>
              x: {refValue?.x?.toFixed(0)}, y: {refValue?.y?.toFixed(0)}
            </div>
            <div>
              width: {refValue?.width?.toFixed(0)}, height: {refValue?.height?.toFixed(0)}
            </div> */}
          </TestBox>
        </Draggable>
      )}
    </>
  );
};

const TestBox = styled.div`
  position: absolute;
  cursor: move;
  color: black;
  width: 250px;
  height: 50px;
  border-radius: 5px;
  padding: 1em;
  margin: auto;
  user-select: none;
  background: lightgrey;
`;

//
