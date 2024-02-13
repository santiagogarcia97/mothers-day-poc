import React, { useState } from "react";
import "./App.css";
import templateHorizontal from "../imgs/layout_horizontal.png";
import templateVertical from "../imgs/layout_vertical.png";
import Button from "./Button";

function App() {
  const [canvasHeight, setCanvasHeight] = useState(900);
  const [canvasWidth, setCanvasWidth] = useState(1600);
  const [canvasClassName, setCanvasClassName] = useState("w-full h-full");

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [message, setMessage] = useState("");

  const [showCard, setShowCard] = useState(false);

  function handleFileUpload(e: any) {
    if (e.target.files.length === 0) {
      setFile(null);
      setFileUrl("");
      return;
    }

    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setFile(file);
    setFileUrl(url);
  }

  const handleInputMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const viewCard = () => {
    setShowCard(true);
    setTimeout(() => {
      drawHorizontalTemplate();
    }, 0);
  };

  /// Dibujo el canvas con el template horizontal
  const drawHorizontalTemplate = () => {
    if (!file || !message) return;
    setCanvasHeight(900);
    setCanvasWidth(1600);
    setCanvasClassName("w-full max-h-full");

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseImage = new Image();

    baseImage.onload = function () {
      ctx.drawImage(baseImage, 800, 280, 640, 480);

      const img2 = new Image();
      img2.src = templateHorizontal;

      img2.onload = function () {
        ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);

        setTimeout(() => {
          ctx.font = "60px SedgwickAve";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.fillStyle = "#f488a0";
          fillTextWithWordWrap(ctx, message, 450, 420, 72, 600);
        }, 0);
      };
    };
    baseImage.src = fileUrl;
  };


  /// Dibujo el canvas con el template vertical
  const drawVerticalTemplate = () => {
    if (!file || !message) return;
    setCanvasHeight(1920);
    setCanvasWidth(1080);
    setCanvasClassName("h-full max-w-full");

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const baseImage = new Image();

    baseImage.onload = function () {
      ctx.drawImage(baseImage, 280, 618, 500, 500);

      const img2 = new Image();
      img2.src = templateVertical;

      img2.onload = function () {
        ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);

        setTimeout(() => {
          ctx.font = "60px SedgwickAve";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.fillStyle = "#f488a0";
          fillTextWithWordWrap(ctx, message, 540, 1350, 72, 700);
        }, 0);
      };
    };
    baseImage.src = fileUrl;
  };


  /// Descargar el canvas como imagen
  const donwloadCanvas = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const dataUrl = canvas.toDataURL("image/jpeg");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "canvas.jpg";
    a.click();
  };


  /// Función para dibujar el texto ralizando line breaks
  const fillTextWithWordWrap = (
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    lineHeight: number,
    fitWidth: number,
  ) => {
    fitWidth = fitWidth || 0;

    if (fitWidth <= 0) {
      context.fillText(text, x, y);
      return;
    }

    let words = text.split(" ");
    let currentLine = 0;
    let idx = 1;
    while (words.length > 0 && idx <= words.length) {
      const str = words.slice(0, idx).join(" ");
      const w = context.measureText(str).width;
      if (w > fitWidth) {
        if (idx == 1) {
          idx = 2;
        }
        context.fillText(
          words.slice(0, idx - 1).join(" "),
          x,
          y + lineHeight * currentLine,
        );
        currentLine++;
        words = words.splice(idx - 1);
        idx = 1;
      } else {
        idx++;
      }
    }
    if (idx > 0)
      context.fillText(words.join(" "), x, y + lineHeight * currentLine);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-blue-100 via-blue-50 to-pink-100">
      {showCard ? (
        <div className="w-full h-full flex flex-col justify-start items-center">
          <div className="w-full flex flex-col sm:flex-row sm:justify-center justify-start mt-12">
            <Button style={{marginBottom: 16, marginInline: 8}} onClick={() => setShowCard(false)}>
              Atras
            </Button>

            <Button style={{marginBottom: 16, marginInline: 8}} onClick={drawHorizontalTemplate}>
              Horizontal
            </Button>

            <Button style={{marginBottom: 16, marginInline: 8}} onClick={drawVerticalTemplate}>
              Vertical
            </Button>

            <Button style={{marginBottom: 16, marginInline: 8}} onClick={donwloadCanvas}>
              Descargar
            </Button>
          </div>

          <div
            className="canvas-container mx-auto flex justify-center items-center p-4 md:max-w-6xl"
            style={{ fontFamily: "Lobster" }}
          >
            <canvas
              id="canvas"
              className={canvasClassName}
              width={canvasWidth}
              height={canvasHeight}
            ></canvas>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-start items-center pt-32">
          <div className="flex flex-col max-w-96 w-full px-4">
            <label htmlFor="large-file-input" className="sr-only">
              Seleccione una imágen
            </label>
            <input
              type="file"
              name="large-file-input"
              id="large-file-input"
              accept="image/*"
              onChange={handleFileUpload}
              className="mb-8 block w-full border bg-white border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-pink-400 focus:ring-pink-400 disabled:opacity-50 disabled:pointer-events-none file:bg-pink-50 file:border-0 file:me-4 file:px-4 file:py-5"
            />

            <input
              type="text"
              id="text"
              placeholder="Escribe tu mensaje"
              onChange={handleInputMessageChange}
              value={message}
              className="mb-12 block px-4 h-16 w-full border bg-white border-gray-200 shadow-sm outline-none rounded-lg text-sm focus:z-10 focus:border-pink-400 focus:ring-pink-400 disabled:opacity-50 disabled:pointer-events-none"
            />

            <Button style={{marginBottom: 48}} onClick={viewCard} disabled={!file || !message}>
              Continuar
            </Button>

            <div id="preloadLobsterFont">.B</div>
            <div id="preloadSedgwickAveFont">.</div>
            {file ? (
              <div className="rounded-xl border-8 border-pink-400 bg-pink-400 flex justify-center items-center">
                <img
                  className="rounded-md object-contain bg-black"
                  src={fileUrl}
                />
              </div>
            ) : (
              <div className="w-full h-64"></div>
            )}
          </div>
          {/* <input type="file" onChange={handleChange} />
            <button onClick={donwloadCanvas}>Download</button>
            <button onClick={drawHorizontal}>Horizontal</button>
            <button onClick={drawVertical}>Vertical</button>

            <img className="w-64 h-64" src={file} /> */}
        </div>
      )}
    </div>
  );
}

export default App;
