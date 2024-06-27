import React, { useState } from "react";

export default function RulesModal() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
        <button className="rules-btn" onClick={toggleModal}>
          ?
        </button>
        {showModal && (
          <div>
            <div className="modal-overlay" onClick={toggleModal} />
            <div className="modal-content rules-modal">
              <h1 className="modal-title">How to play</h1>
              <p className="modal-text rules-text">
                <span className="incorrect-text">Red</span> = Guess is incorrect
                <br/>
                <span className="partial-text">Orange</span> = Guess is partially correct (only applies to species and abilities/investiture) e.g.
                <br/>
                <div className="example-container">
                    <img className="example-img" src="/images/species-partial.png" alt="Species example"/> Character is Human but not Skaa
                </div>
                <br/>
                <div className="example-container">
                    <img className="example-img" src="/images/abilities-partial.png" alt="Abilities example"/> At least one of the abilities/investitures is correct
                </div>
                <span className="correct-text">Green</span> = Guess is correct
                <br/>
                All information is taken from <a className="external-link" href="https://coppermind.net">Coppermind</a>
              </p>
            </div>
          </div>
        )}
    </>
  );
}
