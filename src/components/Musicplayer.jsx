import React, { useState, useRef, useEffect } from "react";
import { Howl } from "howler";

const MusicPlayer = ({ playlist }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const soundRef = useRef(null);

  const currentSong = playlist[currentIndex];

  const playSong = () => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [currentSong.url],
        html5: true,
        onplay: () => setDuration(soundRef.current.duration()),
        onend: () => skipSong(1),
      });
    }
    soundRef.current.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipSong = (direction) => {
    if (soundRef.current) soundRef.current.stop();
    soundRef.current = null;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = playlist.length - 1;
    if (newIndex >= playlist.length) newIndex = 0;

    setCurrentIndex(newIndex);
    setIsPlaying(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (soundRef.current && isPlaying) {
        setCurrentTime(soundRef.current.seek());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (soundRef.current) {
      soundRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold">{currentSong.title}</h1>
      <p className="text-sm text-gray-400">{currentSong.artist}</p>

      {/* Seek Bar */}
      <div className="mt-4">
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full appearance-none bg-gray-600 h-2 rounded"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{currentTime.toFixed(1)}s</span>
          <span>{duration.toFixed(1)}s</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => skipSong(-1)}
          className="bg-gray-700 hover:bg-gray-600 p-2 mx-2 rounded"
        >
          Prev
        </button>
        {isPlaying ? (
          <button
            onClick={pauseSong}
            className="bg-green-500 hover:bg-green-400 p-2 mx-2 rounded"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={playSong}
            className="bg-green-500 hover:bg-green-400 p-2 mx-2 rounded"
          >
            Play
          </button>
        )}
        <button
          onClick={() => skipSong(1)}
          className="bg-gray-700 hover:bg-gray-600 p-2 mx-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
