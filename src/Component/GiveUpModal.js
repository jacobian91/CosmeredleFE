import React from "react";

export default function GiveUpModal({ character, hours, minutes, seconds }) {
  return (
    <>
      <div>
        <div className="modal-overlay"/>
        <div className="modal-content give-up-modal">
          <h1 className="modal-title">Better luck next time!</h1>
          <p className="modal-text">
            The correct character was <a className="external-link" href={`https://coppermind.net/wiki/${character}`}>{character}.</a><br />
            Please try again tomorrow. 
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
