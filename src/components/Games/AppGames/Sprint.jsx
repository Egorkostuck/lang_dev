import React, {useState, useMemo, useEffect, useContext} from 'react';
import styles from './AppGames.module.css';
import stylesSprint from './Sprint.module.css';
import Store from './../../../context';

const Sprint = ({nextWord}) => {
    const data = useContext(Store); 
    const englishWord = useMemo(() => data.playWords.sort(), []);
    const russianWord = useMemo(() => data.playWords[Math.floor(Math.random() * data.playWords.length)], [data.wordIndex]);
    const [timeLeft, setTimeLeft] = useState(15);

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
    
    return(<section className={stylesSprint.sprintContainer}>
        <div className={stylesSprint.sprintTimerContainer}>
          <p className={stylesSprint.sprintTimer}>{timeLeft}</p>
        </div>
        <span>Is it true that</span>
        <h3 className={styles.sprintTimer}>{englishWord[data.wordIndex].translate}</h3>
        <h4 className={stylesSprint.sprintRusWord}>{russianWord.word}</h4>
        <button onClick={() => checkRez(englishWord[data.wordIndex].translate !== russianWord.translate)} className={stylesSprint.btnNo}>No</button>  
        <button onClick={() => checkRez(englishWord[data.wordIndex].translate === russianWord.translate)} className={stylesSprint.btnYes}>Yes</button>  
      </section>
    )
}

export default Sprint;