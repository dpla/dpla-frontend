import React from "react";

import css from "./mediaViewers.module.scss";

function AudioPlayer({ pathToFile, fileFormat }) {
  return (
    <div className={css.audioPlayerWrapper}>
      <audio className={css.audioPlayer} controls controlsList="nodownload">
        <source src={pathToFile} />
      </audio>
    </div>
  );
}
export default AudioPlayer;
