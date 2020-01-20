import React, { useState, useEffect, useRef } from "react";
import muteIcon from '../../assets/images/volume_off.svg';
import soundIcon from '../../assets/images/volume_up.svg';
import './Audio.css';



const Sound = ({ 
  url = null, 
  loop = true, 
  volume = 1, 
  mute, 
  handleMute 
}) => {
   
  const audioRef = useRef(null)
   
  const toggle = () => {
    handleMute();
  }

   
   useEffect(() => {
         mute ? audioRef.current.pause() : audioRef.current.play();
         audioRef.current.volume = volume;
         audioRef.current.loop = loop;
      },
      [mute]
   );
   

  return (
    <div>
      <audio 
        ref={audioRef} 
        src={url} 
        autoPlay
        loop
      />
      <button className="soundIcon" onClick={() => toggle()}>
        <img src={mute ? muteIcon : soundIcon} />
      </button>
    </div>
  );
};

export default Sound;