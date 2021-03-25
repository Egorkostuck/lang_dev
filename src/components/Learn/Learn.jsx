import React, {useRef, useEffect, useContext} from 'react';
import styles from './../Learn/Learn.module.css';
import Store from './../../context';

const Learn = ({library, speak}) => {
    const data = useContext(Store);

    useEffect(() => {
        speak(library[data.wordIndex].translate)
    }, [data.wordIndex]);

    return (
        <section style={{textAlign: 'center'}}>
            <h3 className={styles.englishWord}>{library[data.wordIndex].translate}</h3>
            <span className={styles.russianWord}>{library[data.wordIndex].word}</span>            
        </section>
    )
}

export default Learn