import { useState } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

function App() {

  const [refresh, setRefresh] = useState(0);
  const handleUploadSuccess = () => {
    setRefresh(!refresh);
  };
  
  return (
  <div style={{ padding: "40px" }}>
    <h1>File Manager App</h1>
    <FileUpload onUploadSuccess={handleUploadSuccess} />
    <FileList refreshTrigger={refresh} />
  </div>

  );
}

export default App;