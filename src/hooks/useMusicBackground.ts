import { useEffect, useRef, useState } from "react";
import { Audio } from 'expo-av';
import { useSelector } from "react-redux";
import { rootT } from "../store";

const useMusicBackground = () => {
  const mute = useSelector((state: rootT) => state.mute)
  const track = useRef(new Audio.Sound()).current

  const initialStatus = {
    rate: 1.0,
    shouldCorrectPitch: false,
    volume: 1.0,
    isMuted: false,
    isLooping: true,
    shouldPlay: true,
  };

  useEffect(() => {
    (async () => {
      if (!mute) await track.loadAsync(require('../assets/track.mp3'), initialStatus,)
    })()
    return async () => await track.unloadAsync()
  }, [])


  useEffect(() => {
    (async () => {
      /* getting unresolved promise because if the track is unloadAsync() already then doing it is very much pointless */
      if (mute) await track.unloadAsync()
      else await track.loadAsync(require('../assets/track.mp3'), initialStatus,)
    })()
  }, [mute])
}

export default useMusicBackground