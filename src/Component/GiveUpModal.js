import { Tooltip } from "@mui/material";
import React, { useState } from "react";

export default function GiveUpModal({ character, hours, minutes, seconds }) {
  const [openShareTooltip, setOpenShareTooltip] = useState(false);

  function copyShareText() {
    let copyText = "I couldn't get today's Cosmeredle...\n\n";
    
    copyText = copyText.concat("See if you can at https://cosmeredle.net/");
    navigator.clipboard.writeText(copyText);
    setOpenShareTooltip(true);

    setTimeout(() => {
      setOpenShareTooltip(false);
    }, 500);
  }

  return (
    <>
      <div>
        <div className="modal-overlay"/>
        <div className="modal-content give-up-modal">
          <h1 className="modal-title">Better luck next time!</h1>
          <p className="modal-text">
            The correct character was <a className="external-link" href={`https://coppermind.net/wiki/${character}`}>{character}.</a><br />
            Please try again tomorrow.<br/>
            <Tooltip 
              open={openShareTooltip} 
              title={<span className="tooltip">Copied to clipboard!</span>} 
              placement="bottom" 
              arrow 
              disableInteractive>
              <button className="share-results-btn" onClick={copyShareText}>Click here to share!</button>
            </Tooltip>
          </p>
          {/* <button onClick={() => localStorage.clear()}>Clear localStorage</button> */}
          <p className="modal-timer">
            New round in {hours}:{minutes}:{seconds}
          </p>
        </div>
      </div>
    </>
  );
}
