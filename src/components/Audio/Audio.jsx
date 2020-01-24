import React, { useEffect, useRef } from "react";
import muteIcon from '../../assets/images/volume_off.svg';
import soundIcon from '../../assets/images/volume_up.svg';
import './Audio.css';



function Sound ({ 
  url = null, 
  mute, 
  handleMute,
  volume,
  autoplay,
  loop,
}) {
   
  const audioRef = useRef(null)
   
  const toggle = () => {
    handleMute();
  }

   
   useEffect(() => {
         mute ? audioRef.current.pause() : audioRef.current.play();
         return;
      },
      [mute]
   );

   //Component did mount, set the attributes here, for some reason, in react, we can't set these attributes directly on the audio react element. 
   useEffect(() => {
    audioRef.current.volume = volume;
    audioRef.current.autoplay = autoplay;
    audioRef.current.loop = loop;
    return;
  }, []);
   

  return (
    <div>
      <audio 
        ref={audioRef} 
        src={url} 
      />
      <button className="soundIcon" onClick={() => toggle()}>
        <img src={mute ? muteIcon : soundIcon} alt="" />
      </button>
    </div>
  );
};

export default Sound;