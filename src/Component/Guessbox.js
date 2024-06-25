export default function GuessBox({ guess }) {
  const getResultClass = (value) => {
    switch (value) {
      case 0:
        return "guess-wrong";
      case 1:
        return "guess-partial";
      case 2:
        return "guess-right";
      default:
        return "";
    }
  };

  return (
    <div className="guess-results">
      <div className={`guess-box ${getResultClass(guess.name[1])}`}>
        <h3 className="guess-text">{guess.name[0]}</h3>
      </div>
      <div className={`guess-box ${getResultClass(guess.home_world[1])}`}>
        <h3 className="guess-text">{guess.home_world[0]}</h3>
      </div>
      <div className={`guess-box ${getResultClass(guess.first_appearance[1])}`}>
        <h3 className="guess-text">{guess.first_appearance[0]}</h3>
      </div>
      <div className={`guess-box ${getResultClass(guess.species[1])}`}>
        <h3 className="guess-text">{guess.species[0]}</h3>
      </div>
      <div className={`guess-box ${getResultClass(guess.abilities[1])}`}>
        <h3 className="guess-text">{guess.abilities[0]}</h3>
      </div>
    </div>
  );
}
