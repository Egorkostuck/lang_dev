import React, {useState, useEffect, useMemo, useContext} from 'react';
import Store from './../../../context';
import styles from './AppGames.module.css';


const CheckIt = ({speak, nextWord}) => {  
    const data = useContext(Store);  

    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), []);
    const [currentWords, setCurrentWords] = useState(['random', 'correct', 'random']);

    useEffect(() => {
        setCurrentWords([
            randomWords[data.wordIndex].word,
            randomWords[(data.wordIndex + 1)%randomWords.length].word,
            randomWords[(data.wordIndex + 2)%randomWords.length].word
        ].sort(() => Math.random() - 0.5))
    }, [data.correctWords]);

    const checkWord = (word) => {
        if(word === randomWords[data.wordIndex].word) {
            data.setCorrectWords(data.correctWords + 1);
            speak(randomWords[data.wordIndex].translate);
            nextWord();         
        } else {
            data.setErrorWords(data.errorWords + 1);
        }
    };

    return (
      <section>
        <span>write a translation for this word</span>
        <h3 className={styles.checkRandomWord}>{randomWords[data.wordIndex].translate}</h3>
        <ul className={styles.btnContainer}>
            {currentWords.map((word, index) => (
                <li className={styles.btnCheck} onClick={() => checkWord(word)}>{word}</li>
            ))}
        </ul>
      </section>
    )
};

export default CheckIt