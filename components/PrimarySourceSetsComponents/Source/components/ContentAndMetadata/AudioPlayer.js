import React from "react";

import { classNames } from "./ContentAndMetadata.css";

const AudioPlayer = ({ pathToFile, fileFormat }) =>
  <div className={classNames.audioPlayerWrapper}>
    <audio
      className={classNames.audioPlayer}
      controls
      src={pathToFile}
      type={`audio/${fileFormat}`}
    >
      {/* TODO: actually add captions? don't know if that's a possibility */}
      <track kind="captions" />
    </audio>
  </div>;

export default AudioPlayer;
