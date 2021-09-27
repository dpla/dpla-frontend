import React from "react";

import css from "./mediaViewers.module.scss";

const AudioPlayer = ({ pathToFile, fileFormat }) =>
  <div className={css.audioPlayerWrapper}>
    <audio
      className={css.audioPlayer}
      controls
      controlsList="nodownload"
      src={pathToFile}
      type={`audio/${fileFormat}`}
    >
      {/* TODO: actually add captions? don't know if that's a possibility */}
      <track kind="captions" />
    </audio>
  </div>;

export default AudioPlayer;
