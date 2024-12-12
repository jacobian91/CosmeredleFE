import React from "react";

const DisclaimerModal = ({onClose}) => {
  return (
    <>
          <div>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content disclaimer-modal">
              <img className="exit-btn" src="images/close.png" alt="Close pop-up" onClick={onClose}/>
              <h1 className="modal-title">Spoiler Disclaimer</h1>
              <div className="modal-text disclaimer-text">
                <p className="modal-text">
                    Cosmeredle will not contain any spoilers for Wind and Truth until 28/2/2025 
                    <br/>
                    <br/>
                    Hopefully this gives everyone (including me) enough time to read it while still enjoying Cosmeredle.
                    <br/>
                    <br/>
                    Past this date, please be aware there may be spoilers if you still have not read it!
                </p>
              </div>
            </div>
          </div>
    </>
  );
};

export default DisclaimerModal;