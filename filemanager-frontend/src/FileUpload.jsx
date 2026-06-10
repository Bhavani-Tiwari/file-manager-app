import { useState } from "react";
import axios from "axios";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:8085/files/upload",
        formData
      );

      alert("File uploaded successfully!");
      onUploadSuccess();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

 return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "30px"
  }}>
    <div style={{
      width: "100%",
      maxWidth: "1200px",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#1f2937"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px"
      }}>
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            flex: 1,
            padding: "8px"
          }}
        />

        <button
          onClick={handleUpload}
          style={{
            marginLeft: "15px",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer"
          }}
        >
          Upload
        </button>
      </div>
    </div>
  </div>
);

}

export default FileUpload;
