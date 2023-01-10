import React, { useEffect, useState } from "react";
import "./viewer.scss";
import Axios from "axios";
import { Document, pdfjs, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = (props) => {
  let { fileId } = props;

  const [file, setFile] = useState("");

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const fetchfile = async () => {
    // const { data } = await Axios.get(`http://localhost:3500/${fileId}`);
    const { data } = await Axios({
      url: `http://localhost:3500/${fileId}`,
      method: "get",
      responseType: "blob",
    });

    const file = data;
    console.log(file);
    setFile(file);
  };

  useEffect(() => {
    fetchfile();
  }, [fileId]);

  return (
    <section className="viewer">
      {file && (
        <div className="head">
          <h4 className="heading-name">Document #{fileId}</h4>
        </div>
      )}
      <div className="doc-area">
        {file && (
          <>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <div>
              <p>
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </p>
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
              >
                Previous
              </button>
              <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          </>
        )}
        {!file && <div>No file is selected</div>}
      </div>
    </section>
  );
};

export default Viewer;
