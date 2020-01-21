import React, { useEffect, useRef } from "react";
import muteIcon from '../../assets/images/volume_off.svg';
import soundIcon from '../../assets/images/volume_up.svg';
import './Audio.css';



const Sound = ({ 
  url = null, 
  mute, 
  handleMute,
  volume, 
}) => {
   
  const audioRef = useRef(null)
   
  const toggle = () => {
    handleMute();
  }

   
   useEffect(() => {
         mute ? audioRef.current.pause() : audioRef.current.play();
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
        volume={volume}
      />
      <button className="soundIcon" onClick={() => toggle()}>
        <img src={mute ? muteIcon : soundIcon} />
      </button>
    </div>
  );
};

export default Sound;