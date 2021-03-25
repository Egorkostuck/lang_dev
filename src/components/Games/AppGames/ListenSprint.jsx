import React, {useMemo, useEffect, useState, useContext} from 'react';
import stylesSprint from './../AppGames/Sprint.module.css';
import vector from './../../../assets/img/Vector.png';
import Store from './../../../context'; 

const Listen = ({nextWord, speak}) => {
    const data = useContext(Store); 
    const russianWord = useMemo(() => data.playWords.sort(), []);
    const englishWord = useMemo(() => data.playWords[Math.floor(Math.random() * data.playWords.length)], [data.wordIndex]);
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect (() => {  
      let timer = setInterval(() => {
        setTimeLeft((state) => state -1);
      }, 1000);
      if (timeLeft === 0) {
        setTimeLeft(15);
        data.setErrorWords(data.errorWords + 1);
        nextWord(); 
      }
      return () => clearInterval(timer);      
    });

    const checkRez = (value) => {
      if(value) {
        setTimeLeft(15);
        data.setCorrectWords(data.correctWords + 1);
        nextWord();
      } else {
        data.setErrorWords(data.errorWords + 1);
        setTimeLeft(15);  
        nextWord();
      }
    };  

    return(
        <section className={stylesSprint.sprintContainer}>
        <div className={stylesSprint.sprintTimerContainer}>
          <p className={stylesSprint.sprintTimer}>{timeLeft}</p>
        </div>
        <span>it translates as</span>
        <h3 className={stylesSprint.listenRusWord}>{russianWord[data.wordIndex].word}</h3>
        <div className={stylesSprint.ear}>
          <input onClick={() => speak(englishWord.translate)} type="image"  src={vector}/> 
        </div>
        <button onClick={() => checkRez(russianWord[data.wordIndex].translate !== englishWord.translate)} className={stylesSprint.btnNo}>No</button>  
        <button onClick={() => checkRez(russianWord[data.wordIndex].translate === englishWord.translate)} className={stylesSprint.btnYes}>Yes</button>  
      </section>
    )
}

export default Listen;