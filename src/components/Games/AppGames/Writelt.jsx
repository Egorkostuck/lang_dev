import React, {useRef, useState, useContext} from 'react';
import styles from './AppGames.module.css';
import Store from './../../../context';

const WriteIt = ({speak}) => {
    const data = useContext(Store); 
    const input = useRef();
    const [randomWords, setRandomWords] = useState(data.playWords.sort(() => Math.random() - 0.5));

    const checkWord = (event) => {
        event.preventDefault();
        if(input.current.value === randomWords[data.wordIndex].translate) {
            data.setCorrectWords(data.correctWords + 1);
            speak(randomWords[data.wordIndex].translate);
            if(data.wordIndex !== data.playWords.length - 1) {
                data.setWordIndex(data.wordIndex + 1);
            } else {
                alert('Game over!');
            }            
            input.current.value='';
        } else {
            data.setErrorWords(data.errorWords + 1);
        }
    };
    return (
      <section className={styles.gameContainer}>
        <span>write a translation for this word</span>
        <h3>{randomWords[data.wordIndex].word}</h3>
        <form onSubmit={checkWord} className={styles.writeWordBlock}>
            <input ref={input} type="text"/>
            <button className={styles.btnOk}>Ok</button>
        </form>    
      </section>
    )
};

export default WriteIt