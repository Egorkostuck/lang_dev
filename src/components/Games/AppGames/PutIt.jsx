import React, {useContext, useMemo, useState} from 'react';
import Store from './../../../context';
import styles from './AppGames.module.css';

const PutIt = ({nextWord}) => {
    const data = useContext(Store);
    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), []);
    const splitWords = randomWords[data.wordIndex].translate.split('').sort();
    const [arrPutLetter, setArrPutLetter] = useState([]);
    const [deleteLatter, setDeleteLetter] = useState(splitWords);
    
    const putWord = (item) => {
        setArrPutLetter([...arrPutLetter, item]);
        let b = deleteLatter.join('').replace(item, '').split('');
        setDeleteLetter(b);
        // debugger
    }

    if(arrPutLetter.length === splitWords.length) {
        let fullWord = arrPutLetter.join('');
        if (fullWord === randomWords[data.wordIndex].translate) {
            setDeleteLetter(splitWords);
            data.setCorrectWords(data.correctWords + 1);            
            nextWord();
            setArrPutLetter([]);           
        } else {
            setDeleteLetter(splitWords);
            data.setErrorWords(data.errorWords + 1);            
            nextWord();
            setArrPutLetter([]);          
        }
        // debugger
    }  
    
    return(
        <section>
            <span>Put together a translation</span>
            <div className={styles.putWordsContainer}>
                {arrPutLetter.map((letter,index) => (
                    <div key={index} className={styles.putWordsLetter}>{letter}</div>
                ))}
            </div>
            <div className={styles.splitWordsContainer}>
                {deleteLatter.map((item, index) => (
                    <div className={styles.splitWordsLetter} key={index} onClick={() => putWord(item)}>{item}</div>
                ))}
            </div>
        </section>
    )
}

export default PutIt;