import { useEffect, useState } from "react";
import axios from "axios";

function FileList({refreshTrigger }) {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:8085/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
   
 const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this file?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await axios.delete(`http://localhost:8085/files/${id}`);
    fetchFiles();
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

  const handleDownload = (id) => {
  window.open(`http://localhost:8085/files/download/${id}`);
};

const totalSize = files.reduce((acc, file) => acc + file.fileSize, 0);


  return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "40px"
  }}>
    <div style={{
      width: "80%",
      backgroundColor: "black",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center" }}>📂 File Manager</h2>
      <div style={{ marginTop: "20px" }}>
  <input
    type="text"
    placeholder="Search by file name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      padding: "8px",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ccc"
    }}
  />

  <div style={{ marginTop: "10px" }}>
    <strong>Total Files:</strong> {files.length} <br />
    <strong>Total Storage:</strong> {(totalSize / 1024).toFixed(2)} KB
  </div>
</div>


      <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  }}
>
        <thead>
          <tr>
            <th style={{padding:"10px"}}>ID</th>
            <th style={{padding:"10px"}}>Name</th>
            <th style={{padding:"10px"}}>Type</th>
            <th style={{padding:"10px"}}>Size</th>
            <th style={{padding:"10px"}}>Uploaded At</th>
            <th style={{padding:"10px"}}>Action</th>
          </tr>
        </thead>
  <tbody>

{files.filter(file =>
  file.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
).length === 0 ? (

  <tr>
    <td colSpan="6" style={{ textAlign: "center" }}>
      📂 No files found.
    </td>
  </tr>

) : (

  files
    .filter(file =>
      file.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((file) => (
            <tr key={file.id}>
              <td>{file.id}</td>
              <td>{file.fileName}</td>
              <td>
  {file.fileType.startsWith("image/")
    ? "🖼️ "
    : file.fileType.includes("pdf")
    ? "📄 "
    : "📁 "}
  {file.fileType}
</td>
              <td>{(file.fileSize / 1024).toFixed(2)} KB</td>
              <td>
  {new Date(file.uploadedAt).toLocaleString("en-IN")}
</td>
                 <td>
        <button
  onClick={() => handleDownload(file.id)}
  style={{
    marginRight: "10px",
    backgroundColor: "green",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  ⬇ Download
</button>

<button
  onClick={() => handleDelete(file.id)}
  style={{
    backgroundColor: "red",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  🗑 Delete
</button>

      </td>
            </tr>
          ))
)}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default FileList;
