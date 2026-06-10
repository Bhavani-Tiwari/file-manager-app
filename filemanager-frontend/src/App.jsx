import { useState } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

function App() {

  const [refresh, setRefresh] = useState(0);
  const handleUploadSuccess = () => {
    setRefresh(!refresh);
  };
  
  return (
    <div
  style={{
    minHeight: "100vh",
    backgroundColor: "#111827",
    color: "white",
    padding: "40px"
  }}
>
    
    <h1
  style={{
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "3rem"
  }}
>
  📁 File Manager App
</h1>
    <FileUpload onUploadSuccess={handleUploadSuccess} />
    <FileList refreshTrigger={refresh} />
  </div>

  );
}

export default App;