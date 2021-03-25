import React from 'react';
import * as classes from './Dashboard.module.css';
import PlayButton from './../../assets/img/play.svg';
const Dashboard = ({points}) => {    
    return (
        <section className={classes.dashboardContainer}>
            <div className={classes.gameBlock}>
                <p>The most popular game is <br />
                    <b>Speak IT</b>
                </p>
                <img className={classes.btnPlay} src={PlayButton} alt=""/>
                <button className={classes.btnRandom}>Play random game</button>
            </div>
            <div className={classes.pointsBlock}>
                <span>Common experience</span>
                <h3>{points} points</h3>
            </div>
            <div className={classes.levelBlock}>
                <span>level</span>
                <h3>{(0.2 * Math.sqrt(points)).toFixed()}7 level</h3>
                <p>Learn 750 new words in one course</p>
                <div className={classes.levelBackground}></div>
            </div>            
        </section>
    )
}

export default Dashboard