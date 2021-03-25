import React, {useMemo, useState, useContext} from 'react';
import done from './../../../assets/img/done.png';
import microphone from './../../../assets/img/microphone.png';
import styles from './Speak.module.css';
import Store from './../../../context';

const Speak = ({nextWord}) => {
    const data = useContext(Store); 
    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), []);
    const [text, setText] = useState();  

    const listenVoice = (event) => {        
        const speech = new window.webkitSpeechRecognition();        
        speech.interimResults = 'true';
        speech.lang = 'en-Us';
        speech.start();
        speech.onresult = (event) => {
            let result = event.results[event.resultIndex];
            if (result.isFinal) {
                if(result[0].transcript === randomWords[data.wordIndex].translate) {
                    data.setCorrectWords(data.correctWords + 1);
                    nextWord();
                }
            } else {
                setText(result[0].transcript);
                console.log('промежуточный' + result[0].transcript);          
            }
        };   
    };     

    return(
        <section className={styles.speakContainer}>
            <span>say this word</span>
            <h3 className={styles.randWord}>{randomWords[data.wordIndex].translate}</h3>
            <div className={styles.textVoice}>
                <p>{text}</p>
                <img className={styles.done} src={done} alt="check done" />
            </div>
            <input style={{display: "block"}} onClick={(event) => listenVoice(event)} type="image" className={styles.btnMicro} src={microphone}/>            
            <button onClick={nextWord} className={styles.btnSkip}>SKIP IT</button>
        </section>
    )
}

export default Speak;


