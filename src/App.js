import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import Library from './components/Library/Library';
import { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
import Games from './components/Games/Games';
import Learn from './components/Learn/Learn';
import styles from './App.module.css';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Store from './context';
import games from './components/Games/index';


function App() {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || []);
  const [wordIndex, setWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [errorWords, setErrorWords] = useState(0);
  const [cookie, setCookie] = useCookies(['points']);
  const [points, setPoints] = useState(+cookie.points || 0);
  const [playWords, setPlayWords] = useState(library.slice(-10));
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  

  console.log(cookie);
  useEffect(() => {
    if(correctWords) {
      setPoints(points + correctWords);
      setCookie('points', points + 1);
    }  
  }, [correctWords]);

  console.log(library);
  const progressBarWidth = {
    width: `${(100 / library.slice(-10).length) * (wordIndex + 1)}vw`
  };
  
  const speak = (word) => {
    const speakInstance = new SpeechSynthesisUtterance(word);
    speakInstance.voice = speechSynthesis.getVoices()[51];
    speechSynthesis.speak(speakInstance);
  };

  const nextWord = () => {
    if (wordIndex !== playWords.length-1){
        setWordIndex(wordIndex + 1);
    } else {
        alert('Game is over');
        setWordIndex(0);
    }     
  };
  
  return (
    <BrowserRouter>
    <Store.Provider value={{correctWords, setCorrectWords, errorWords, setErrorWords, playWords, wordIndex, setWordIndex}}>
    <Header />        
    <Switch>
      <Route path="/dashboard">
        <Dashboard points={points}/>
      </Route>
      <Route path="/library">
        <Library library={library} setLibrary={setLibrary} />
      </Route>
      <Route path="/learn">
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={progressBarWidth}></div>
        </div>
        <Learn speak={speak} library={library} />
        <div onClick={() => {
          if(wordIndex === library.length - 1 ){
            setWordIndex(0)
          } else {
            setWordIndex(wordIndex + 1)
          }             
        }} className={styles.btnNext}></div>
      </Route>
      <Route path="/games">
        <Games />
      </Route>
      <Route path='/game'>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={progressBarWidth}></div>
        </div>
        <nav className={styles.gameNav}>
          <NavLink className={styles.btnBack} to={'/games'}>
          </NavLink>
          <ul className={styles.results}>
            <li>Errors:{errorWords}</li>
            <li>Correct:{correctWords}</li>
            <li>Points:{points}</li>
          </ul>
        </nav>
        <section className={styles.gameContainer}>
            {games.map((game,index) => <Route path={`/game/${game.path}`}>
              <game.component nextWord={nextWord} speak={speak}/>
            </Route>)}
        </section>
      </Route>     
      <Route path="/sign-in">
        <SignIn users={users} setUsers={setUsers} />
      </Route>
      <Route path="/sign-up">
        <SignUp users={users} setUsers={setUsers} />
      </Route>
    </Switch>
  </Store.Provider>
  </BrowserRouter>
  );
}

export default App;