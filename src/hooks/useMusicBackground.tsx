import { useEffect, useRef, useState } from "react";
import { Audio } from 'expo-av';
import { useSelector } from "react-redux";
import { rootT } from "../store";

const useMusicBackground = () => {
  const mute = useSelector((state: rootT) => state.mute)
  const [playTrack, setPlayTrack] = useState(true)
  const track = useRef(new Audio.Sound()).current

  const initialStatus = {
    rate: 1.0,
    shouldCorrectPitch: false,
    volume: 1.0,
    isMuted: mute,
    isLooping: true,
    shouldPlay: playTrack,
  };

  useEffect(() => {
    (async () => {
      await track.loadAsync(require('../assets/track.mp3'), initialStatus,)
      console.log(track, 'track exists');
    })()
    return async () => await track.unloadAsync()
  }, [])


  useEffect(() => {
    (async () => {
      if (mute) await track.unloadAsync()
      else await track.loadAsync(require('../assets/track.mp3'), initialStatus,)
    })()
  }, [mute])
}

export default useMusicBackground