import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import "./App.css";
import Autocompletecharacters from "./Component/Autocomplete";
import Guessbox from "./Component/Guessbox";
import GameWonModal from "./Component/GameWonModal";
import NewGameAlertModal from "./Component/NewGameAlertModal";
import RulesModal from "./Component/RulesModal";

function App() {
  const [characterList, setCharacterList] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(calcTimeRemaining());
  const [newGame, setNewGame] = useState(false);
  const [gameWon, setGameWon] = useState(() => {
    const storedWin = localStorage.getItem("gameWon");
    return storedWin ? JSON.parse(storedWin) : false;
  });
  const [guessCount, setGuessCount] = useState(() => {
    const storedGuessCount = localStorage.getItem("guessCount");
    return storedGuessCount ? JSON.parse(storedGuessCount) : 0;
  });
  const [guessList, setGuessList] = useState(() => {
    const storedGuesses = localStorage.getItem("guessList");
    return storedGuesses ? JSON.parse(storedGuesses) : [];
  });
  const [correctChar, setCorrectChar] = useState(() => {
    const storedCorrectChar = localStorage.getItem("correctChar");
    return storedCorrectChar ? storedCorrectChar : "";
  });
  const [playDate, setPlayDate] = useState(() => {
    const storedPlayDate = localStorage.getItem("playDate");
    return storedPlayDate ? storedPlayDate : "";
  });
  const [openTooltip, setOpenTooltip] = useState(false);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const autocompleteChange = (event, value) => {
    setSelectedCharacter(value);
  };

  const addGuess = (newGuess) => {
    setGuessList((prevGuessList) => [...prevGuessList, newGuess]);
  };

  const updateGuessCount = () => {
    setGuessCount((prevGuessCount) => (prevGuessCount += 1));
  };

  const checkGameWon = (guess) => {
    if (Object.values(guess).every((value) => value[1] === 2)) {
      setCorrectChar(guess["name"][0]);
      setGameWon(true);
      setPlayDate(new Date().toDateString());
    }
  };

  function getCharacterList() {
    api("/list")
      .then((response) => {
        const res = response.data;
        setCharacterList({
          names: res.names,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.respoonse.headers);
        }
      });
  }

  function makeGuess() {
    api("/guess/" + selectedCharacter)
      .then((response) => {
        const res = response.data;
        const newGuess = {
          name: res.name,
          home_world: res.home_world,
          first_appearance: res.first_appearance,
          species: res.species,
          abilities: res.abilities,
        };
        addGuess(newGuess);
        updateGuessCount();
        setSelectedCharacter(null);
        checkGameWon(newGuess);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.respoonse.headers);
        }
      });
  }

  function getCorrectChar() {
    api("/correctchar")
      .then((response) => {
        const res = response.data;
        setCorrectChar(res.name);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.respoonse.headers);
        }
      });
  }

  function calcTimeRemaining() {
    const now = new Date();
    const resetTime = new Date(now);

    resetTime.setUTCHours(0, 0, 0, 0);

    let timeDiff = resetTime - now;

    if (timeDiff <= 0) {
      resetTime.setDate(resetTime.getDate() + 1);
      timeDiff = resetTime - now;
    }
    return timeDiff;
  }

  function resetGame() {
    localStorage.clear();
    setGuessList([]); 
    setGuessCount(0); 
    setGameWon(false);
    setCorrectChar(""); 
    setPlayDate(new Date().toDateString()); 
    setSelectedCharacter("");
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calcTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getCharacterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let date = new Date().toDateString();
    if (new Date(playDate).toDateString() !== date) {
      resetGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //No dependency due to only running on initial render

  useEffect(() => {
    localStorage.setItem("guessList", JSON.stringify(guessList));
  }, [guessList]);

  useEffect(() => {
    localStorage.setItem("gameWon", JSON.stringify(gameWon));
  }, [gameWon]);

  useEffect(() => {
    localStorage.setItem("guessCount", JSON.stringify(guessCount));
  }, [guessCount]);

  useEffect (() => {
    localStorage.setItem("correctChar", correctChar);
  }, [correctChar]);
  
  useEffect (() => {
    localStorage.setItem("playDate", playDate);
  }, [playDate]);

  const hours = String(
    Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
  ).padStart(2, "0");
  const minutes = String(Math.floor((timeRemaining / 1000 / 60) % 60)).padStart(
    2,
    "0"
  );
  const seconds = String(Math.floor((timeRemaining / 1000) % 60)).padStart(
    2,
    "0"
  );

  function checkNewGame(hours, minutes, seconds) {
    if (hours === "00" && minutes === "00" && seconds === "00") {
      if (gameWon) {
        resetGame();
      } else {
        getCorrectChar();
        setNewGame(true);
      }
    }
  }

  useEffect(() => {
    checkNewGame(hours, minutes, seconds);
    // eslint-disable-next-line
  }, [seconds])

  function copyEmail() {
    const copyText = "cosmeredle@gmail.com"
    navigator.clipboard.writeText(copyText);
    setOpenTooltip(true);

    setTimeout(() => {
      setOpenTooltip(false);
    }, 500);
  };

  return (
    <div className="App">
      <img className="background-img" src="/images/CosmeredleBackground.png" alt="Cosmere constellation background"/>
      <header className="App-header">
        <h1 className="header-txt">Cosmeredle</h1>
      </header>
      <div className="search-container">
        <div className="searchbar">
          {characterList.names ? (
            <Autocompletecharacters
              className="autocomplete-search"
              onChange={autocompleteChange}
              characters={characterList.names.sort()}
              guesses={guessList.map((value) => value.name[0])}
              disabled={gameWon}
            />
          ) : (
            <p>Loading Characters...</p>
          )}
          <button
            className="guess-btn"
            disabled={!selectedCharacter}
            onClick={makeGuess}
          >
            Guess
          </button>
        </div>
      </div>
      <div>
        <p className="game-timer">
          New round in {hours}:{minutes}:{seconds}
        </p>
      </div>
      <div className="title-wrapper">
        <div className="guess-title">
          <h3 className="title-text">Name</h3>
        </div>
        <div className="guess-title">
          <h3 className="title-text">Home World</h3>
        </div>
        <div className="guess-title">
          <h3 className="title-text">First Appearance</h3>
        </div>
        <div className="guess-title">
          <h3 className="title-text">Species</h3>
        </div>
        <div className="guess-title">
          <h3 className="title-text">Abilities/ Investiture</h3>
        </div>
      </div>
      <div className="guesses-wrapper">
        {guessList.length > 0 ? (
          guessList
            .slice()
            .reverse()
            .map((guess, index) => <Guessbox key={`${guess.name[0]}-${index}`} guess={guess} isLatestGuess={index === 0}/>)
        ) : (
          <div className="guess-results">
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
          </div>
        )}
      </div>
      <div>
        {gameWon && (
          <GameWonModal
            character={correctChar}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            guessCount={guessCount}
          />
        )}
      </div>
      <div>
        <NewGameAlertModal
          newGame={newGame && !gameWon}
          character={correctChar}
        />
      </div>
      <div>
        <RulesModal/>
      </div>
      <div className="kofi-btn">
        <a className="kofi-link" href="https://ko-fi.com/kelvinprussia">
          <img className="kofi-img" src="/images/kofi_logo.png" alt="Kofi logo"/>
        </a>
      </div>
      <footer className="App-footer">
        <div className="footer-info footer-1">
          Contact: <Tooltip 
                      className="copied-tooltip" 
                      open={openTooltip} 
                      title="Copied!" 
                      placement="top" 
                      arrow 
                      disableInteractive>
                        <button className="contact-link" onClick={copyEmail}>cosmeredle@gmail.com</button>
                    </Tooltip>
        </div>
        <div className="footer-info footer-2">
          All Cosmere characters belong to <a className="external-link" href="https://www.brandonsanderson.com/">Brandon Sanderson</a> / <a className="external-link" href="https://www.dragonsteelbooks.com/">Dragonsteel</a>
         </div>
         <div className="footer-info footer-3">
          Background by <a className="external-link" href="https://cosmere.es/">cosmere.es</a> & <a className="external-link" href="https://www.instagram.com/izykstewart/">Isaac Stewart</a>
         </div>
      </footer>
    </div>
  );
}

export default App;
