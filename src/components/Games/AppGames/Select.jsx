import React, {useMemo, useState, useEffect, useContext} from 'react';
import styles from './AppGames.module.css';
import Store from './../../../context';

const Select = ({speak, nextWord}) => {
    const data = useContext(Store); 
    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), []);
    const [currentWords, setCorrentWords] = useState(['random', 'correct', 'random']);

    useEffect(() => {
        setCorrentWords([
            randomWords[data.wordIndex].translate,
            randomWords[(data.wordIndex+1)%randomWords.length].translate,
            randomWords[(data.wordIndex+2)%randomWords.length].translate,            
        ].sort(() => Math.random() - 0.5));       
    }, [data.correctWords]);

    const checkWord = (word) => {
        if (word === randomWords[data.wordIndex].translate){
            data.setCorrectWords(data.correctWords + 1);
            speak(randomWords[data.wordIndex].translate);
            nextWord();         
        } else {
            data.setErrorWords(data.errorWords + 1);
        }
    }

    return (
        <section>
            <span>choose this word</span>
            <h3>{randomWords[data.wordIndex].word}</h3>
            <ul className={styles.btnContainer}>
                {currentWords.map((word, index) => (
                    <li className={styles.btnCheck} onClick={() => checkWord(word)}>{word}</li>
                ))}
            </ul>
        </section>
    )
}

export default Select;