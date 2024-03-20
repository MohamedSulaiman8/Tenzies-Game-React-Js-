import React, { useEffect } from "react";
import {useState} from "react";
import './App.css'
import Die from './components/Die'
import { nanoid } from "nanoid";
export default function App(){
  function generateDie(){
    return ({
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    })
  }
  function allNewDice(){
    const newDice=[]
    for(let i=0;i<10;i++){
      newDice.push(generateDie())
    }
    return newDice
  }
function hold(id){
  setDice(oldDice=>oldDice.map(
    die=>{return die.id===id?{...die,isHeld:!die.isHeld}:
    die}
  ))
}
  const [dice,setDice]=useState(allNewDice())
  const [tenzies,setTenzies]=useState(false)
  useEffect(()=>{
    const allHeld=dice.every(die=>die.isHeld)
    const firstVal=dice[0].value
    const allSame=dice.every(die=>die.value==firstVal)
    if(allHeld && allSame){
      console.log("won")
      setTenzies(true);
    }
  },[dice])
  const diceElements=dice.map(die=><Die key={die.id} value={die.value} isHeld={die.isHeld} hold={()=>hold(die.id)}/>)
  function rollDice(){
    if(tenzies){
      setDice(allNewDice)
      setTenzies(false)
    }
    setDice(old=>old.map(die=>{
      return die.isHeld?die:
      generateDie()
    }))
  }
  return(
    <main>
      <h1 className="title">Tenzies</h1>
      {tenzies ? <h2>You Won</h2>:<h4 className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>}  
      <div className="die-container">
        {diceElements}
      </div>
       <button className="roll" onClick={rollDice}>
        {tenzies?"New Game":"Roll"}
        </button>
    </main>
  )
}