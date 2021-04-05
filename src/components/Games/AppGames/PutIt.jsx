import React, {useContext, useEffect, useMemo, useState} from 'react';
import Store from './../../../context';
import styles from './AppGames.module.css';

const PutIt = ({nextWord}) => {
    const data = useContext(Store);
    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), []);
   
    const [arrPutLetter, setArrPutLetter] = useState([]);
    const [splitWords, setSplitWords] = useState([]);
    useEffect(() => {
        setSplitWords(randomWords[data.wordIndex].translate.split('').sort())
    }, [data.wordIndex])
    
    const putWord = (item) => {
        const currentLettersArray = [...arrPutLetter, item]
        const currentWord = randomWords[data.wordIndex].translate
        setArrPutLetter(currentLettersArray);
        setSplitWords(splitWords.join('').replace(item, '').split(''))
        if(arrPutLetter.length === currentWord.length - 1) {
            let fullWord = currentLettersArray.join('');
            if (fullWord === currentWord) {
                data.setCorrectWords(data.correctWords + 1);            
                nextWord();
                setArrPutLetter([]);           
            } else {
                data.setErrorWords(data.errorWords + 1);            
                nextWord();
                setArrPutLetter([]);          
            }
        }  
    }

    const returnWord = (letter) => {
        const letterIndex = arrPutLetter.indexOf(letter)
        setArrPutLetter(arrPutLetter.filter((item, index) => letterIndex !== index))
        setSplitWords([...splitWords, letter])
    }


    
    return(
        <section>
            <span>Put together a translation</span>
            <div className={styles.putWordsContainer}>
                {arrPutLetter.map((letter,index) => (
                    <div key={index} onClick={() => returnWord(letter)} className={styles.putWordsLetter}>{letter}</div>
                ))}
            </div>
            <div className={styles.splitWordsContainer}>
                {splitWords.map((item, index) => (
                    <div className={styles.splitWordsLetter} key={index} onClick={() => putWord(item)}>{item}</div>
                ))}
            </div>
        </section>
    )
}

export default PutIt;