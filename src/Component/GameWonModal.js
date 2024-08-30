import { Tooltip } from "@mui/material";
import React, { useState } from "react";

export default function GameWonModal({ character, hours, minutes, seconds, guessCount, guessResults}) {
  const [openShareTooltip, setOpenShareTooltip] = useState(false);

  function copyShareText() {
    let copyText = "I got todays wordle in " + guessCount + "!\n";
    
    guessResults.forEach(line => {
      copyText = copyText.concat(line.join(""), "\n\n");
    })
    copyText = copyText.concat("Try and beat me at https://cosmeredle.net/");
    navigator.clipboard.writeText(copyText);
    setOpenShareTooltip(true);

    setTimeout(() => {
      setOpenShareTooltip(false);
    }, 500);
  }

  return (
    <>
      <div className="modal-delay">
        <div className="modal-overlay"/>
        <div className="modal-content game-won-modal">
          <h1 className="modal-title">Congratulations!</h1>
          <p className="modal-text">
            The correct character was <a className="external-link" href={`https://coppermind.net/wiki/${character}`}>{character}.</a>
            <br />
            {guessCount === 1 ? (
              <span>You guessed it right on the first try!</span>
            ) : (
              <span>You got it in {guessCount} tries.</span>
            )}<br/>
            {guessResults.map((line, index) => (
                  <React.Fragment key={index}><span>{line}</span><br/></React.Fragment>
            ))}
            <Tooltip 
              open={openShareTooltip} 
              title={<span className="tooltip">Copied to clipboard!</span>} 
              placement="bottom" 
              arrow 
              disableInteractive>
              <button className="share-results-btn" onClick={copyShareText}>Click here to share!</button>
            </Tooltip>
          </p>
          <button onClick={() => localStorage.clear()}>Clear localStorage</button>
          <p className="modal-timer">
            New round in {hours}:{minutes}:{seconds}
          </p>
        </div>
      </div>
    </>
  );
}
