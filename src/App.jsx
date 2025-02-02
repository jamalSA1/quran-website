import AudioPlay from "./components/AudioPlay";
import { useEffect } from "react";
import { setupSupabaseStorage } from "./utils/setupStorage";
import icon from "./assets/icon.png";

function App() {
  useEffect(() => {
    setupSupabaseStorage();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "2rem"
      }}
    >
      <div
        style={{
          marginBottom: "5rem",
          padding: "1rem",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <img src={icon} alt="icon" width={120} height={120} />
      </div>
      <AudioPlay />
    </div>
  );
}

export default App;
