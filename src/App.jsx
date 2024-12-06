import React from "react";
import playlist from "./data/Playlist";
import MusicPlayer from "./components/Musicplayer";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <MusicPlayer playlist={playlist} />
    </div>
  );
}

export default App;
