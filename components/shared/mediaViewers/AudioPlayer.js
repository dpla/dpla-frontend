import React from "react";

import { classNames, stylesheet } from "./mediaViewers.css";

const AudioPlayer = ({ pathToFile, fileFormat }) =>
  <div className={classNames.audioPlayerWrapper}>
    <audio
      className={classNames.audioPlayer}
      controls
      controlsList="nodownload"
      src={pathToFile}
      type={`audio/${fileFormat}`}
    >
      {/* TODO: actually add captions? don't know if that's a possibility */}
      <track kind="captions" />
    </audio>
    <style>{stylesheet}</style>
  </div>;

export default AudioPlayer;
