import React from 'react';
import "./hangman.css";
require.context('./hangman', false, /\.(png|jpe?g|svg)$/);

function importAll(r) {
 let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
 return images
}
const images = importAll(require.context('./hangman', false, /\.(png|jpe?g|svg)$/));


export default class Hangman extends React.Component{
  constructor(props){
    super(props)
    
    this.props=({
      guessesLeft: (props),
    })  
  }
   
  render(){
    let hangmanState = 10 - this.props.guessesLeft
    let combinedName = hangmanState + ".png"
    return(
      <div>
        <img className = "hangman-image"src = {images[combinedName]} alt=''/>
      </div>
    )
  }
}