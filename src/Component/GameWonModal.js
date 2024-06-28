import React from "react";

export default function GameWonModal({ character, hours, minutes, seconds, guessCount }) {
  return (
    <>
      <div>
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
            )}
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
