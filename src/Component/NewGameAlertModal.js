import React, { useEffect, useState } from "react";

export default function NewGameAlertModal({ newGame, character }) {
    const [showModal, setShowModal] = useState(newGame);

    useEffect(() => {
        setShowModal(newGame);
    }, [newGame]);

  return (
    <>
    { showModal && (
      <div>
        <div className="modal-overlay"/>
        <div className="modal-content game-over-modal">
          <h1 className="modal-title">Out of time!</h1>
          <p className="modal-text">
            The correct character was <a className="external-link" href={`https://coppermind.net/wiki/${character}`}>{character}.</a><br /><br />
            A new game has started, please refresh. 
          </p>
        </div>
      </div>
      )
    }
    </>
  );
}
