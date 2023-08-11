"use client";
import * as React from "react";
// import { usePdf } from "@mikecousins/react-pdf";
import { Document, Page, pdfjs } from "react-pdf";
import PDFViewer from "pdf-viewer-reactjs";
import axios from "axios";

export default function PdfTestPage() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = React.useState<number>(0);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const [page, setPage] = React.useState(1);
  const canvasRef = React.useRef(null);
  console.log(numPages);
  const [pdf, setPdf] = React.useState("/images/default/sample.pdf");
  // const { pdfDocument, pdfPage } = usePdf({
  //   // file: "https://www.africau.edu/images/default/sample.pdf",
  //   file: "/images/default/sample.pdf",
  //   page,
  //   canvasRef,
  // });
  // console.log(pdfDocument);
  // const loadBannerSliderData = () => {
  //   axios({
  //     method: "get",
  //     url: "/images/default/sample.pdf",
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // React.useEffect(() => {
  //   axios.get("http:localhost:8080/pdf").then((res) => {
  //     setPdf(res.data);
  //     console.log(res.data);
  //   });
  // }, []);
  return (
    <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
      {/* <PDFViewer
        document={{
          url: pdf,
        }}
      /> */}
      {/* {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul className="pager">
            <li className="previous">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>
            <li className="next">
              <button disabled={page === pdfDocument.numPages} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )} */}
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {/* <Page pageNumber={pageNumber} /> */}
        {Array.from({ length: numPages as number }, (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} />
        ))}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
