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
              <div className="modal-text rules-text">
                <span><span className="incorrect-text">Red</span> = Guess is incorrect</span>
                <br/>
                  <span><span className="partial-text">Orange</span> = Guess is partially correct (only applies to species and abilities/investiture) e.g.</span>
                <br/>
                <div className="example-container">
                  <img className="example-img" src="/images/species-partial.png" alt="Species example"/>
                  <span>Character is Human but not Skaa</span>
                </div>
                <br/>
                <div className="example-container">
                  <img className="example-img" src="/images/abilities-partial.png" alt="Abilities example"/>
                  <span>At least one of the abilities/investitures is correct</span>
                </div>
                <br/>
                <span><span className="correct-text">Green</span> = Guess is correct</span>
                <br/>
                <span>All information is taken from <a className="external-link" href="https://coppermind.net">Coppermind</a></span>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
