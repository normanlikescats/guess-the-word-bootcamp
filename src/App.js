import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Hangman from "./hangman.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      guessesLeft: 10,
      // Insert form input state here
      currGuess:'',
      roundsWon: 0 ,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.join(' ');
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange =(e)=>{
    this.setState({
      currGuess: e.target.value.toLowerCase(),
    });
  };

  handleSubmit = (e)=>{
    e.preventDefault();
    let currGuessesLeft = (this.state.guessesLeft)
    if(this.state.currGuess === ''){
      alert("You really just guessed nothing huh?")
    } else if(this.state.guessedLetters.indexOf(this.state.currGuess)>-1){
      alert("💀💀💀 You've already guessed that, ya noob! 💀💀💀")
    }else if (this.state.currGuess.length > 1){
      alert("Guess only  1️⃣  letter at a time!")
    }else if(this.state.currWord.indexOf(this.state.currGuess) === -1){
      currGuessesLeft -= 1;
      this.state.guessedLetters.push(this.state.currGuess);
    } else{
      this.state.guessedLetters.push(this.state.currGuess);
    }

    let won = true;
    let currRoundsWon = this.state.roundsWon;
    for(let i = 0; i < this.state.currWord.length; i++ ){
      if(!(this.state.guessedLetters.includes(this.state.currWord[i]))){
        won = false;
      }
    }
    if (won === true){
      currRoundsWon +=1;
    }

    this.setState({
      guessedLetters: this.state.guessedLetters,
      guessesLeft: currGuessesLeft,
      currGuess: '',
      roundsWon: currRoundsWon,
    })
  }

  resetGame=()=>{
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 10,
      currGuess:'',
    });
  }

  getHint=()=>{
    let hintArray = [];
    for (let i = 0; i < this.state.currWord.length; i++){
      if(!(this.state.guessedLetters.includes(this.state.currWord[i]))){
        hintArray.push(this.state.currWord[i]);
      }
    }
    
    let randomHint = hintArray[Math.floor(Math.random() * hintArray.length)]
    let currGuessedLetters = this.state.guessedLetters
    currGuessedLetters.push(randomHint)

    this.setState({
      guessedLetters: currGuessedLetters
    })
  }

  render() {
    let wordDisplay = this.generateWordDisplay()
    let output = ""
    let gameOver = false;
    if (!wordDisplay.includes("_")){
      output = `You won!`
      gameOver = true;
    } else if(wordDisplay.includes("_") && this.state.guessesLeft === 0 ){
      output = `You Lost! The word was ${this.state.currWord}!`
      gameOver = true;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <div className = "flex-container">
            <div className = "flex-left">
              <Hangman guessesLeft = {this.state.guessesLeft}/>
              <h3>Word Display</h3>
              {wordDisplay}
              <br/><br/>
              <button className = 'app-button' onClick={this.getHint}>Hint!</button>
            </div>
            <div>
              <h3>Rounds Won: {this.state.roundsWon}</h3>
              <h3>Guessed Letters: {this.state.guessedLetters.length > 0
                ? this.state.guessedLetters.toString(): "-"}</h3>
              <h3>Guesses Remaining: {this.state.guessesLeft}</h3>
              {gameOver === false ? <form onSubmit={this.handleSubmit}>
                <h3>⬇️ Make your guess here ⬇️</h3>
                <input autoFocus type = 'text' onChange = {this.handleChange} placeholder ='Guess a letter!' value= {this.state.currGuess} />
                <br/><br/><input className = 'app-button' type="submit" value="Submit" />
              </form>: <button className = 'app-button' onClick = {this.resetGame}>New Round!</button>}
              <h3>{output}</h3>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;