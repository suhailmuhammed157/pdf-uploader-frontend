import { useEffect, useState } from "react";
import "./App.scss";
import Sidebar from "./parts/Sidebar/Sidebar";
import Viewer from "./parts/Viewer/Viewer";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  /* state to hold the first element */
  const [selectedId, setSelectedId] = useState(1);

  /* state to identify if new pdf file is succesfully posted */
  const [sendData, setSendData] = useState(false);

  /* identify which element is selected from the list of files */
  const handleClick = (id) => {
    setSelectedId(id);
  };

  /* handle upload click. The selected file is sent to the url */
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    let bodyFormData = new FormData();
    bodyFormData.append("files", selectedFile);
    try {
      const response = await Axios.post(
        `http://localhost:3500/upload`,
        bodyFormData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === "success") {
        setSendData(true);
        toast("File uploaded succesfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "toast-message-success",
        });
      }
    } catch (err) {
      console.log(err.response.data.message);

      /* shows the error when uploading as a toaster */
      toast(err.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "toast-message",
      });
    }
  };

  const [files, setfiles] = useState([]);

  /* get all the files */
  const fetchfiles = async () => {
    const { data } = await Axios.get("http://localhost:3500/");
    const files = data.result;
    setfiles(files);
  };

  /* iload all the files for the initial time and load when sendData is true  */
  useEffect(() => {
    fetchfiles();
  }, [sendData]);

  return (
    <div className="App">
      <Sidebar
        handleFile={handleFile}
        files={files}
        selectedId={selectedId}
        handleClick={handleClick}
      />
      <Viewer fileId={selectedId} />
      <ToastContainer />
    </div>
  );
}

export default App;
