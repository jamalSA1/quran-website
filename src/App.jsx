import AudioPlay from "./components/AudioPlay";
import { useEffect } from "react";
import { setupSupabaseStorage } from "./utils/setupStorage";

function App() {
  useEffect(() => {
    setupSupabaseStorage();
  }, []);

  return (
    <div>
      <AudioPlay />
    </div>
  );
}

export default App;
