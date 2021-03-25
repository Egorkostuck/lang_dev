import React from 'react';
import styles from './SignIn.module.css';
import {NavLink} from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignIn = (props) => {
    const {register, handleSubmit, errors} = useForm();
    const validators = {
        required: 'the field can not be empty '
    };
    const signIn = (value) => {
        console.log(props.users);
        props.users.find((item, index) => item.email === value.email && item.password === value.password) ? alert('Hello! You are logged in to the app') :  alert('Wrong login or password');
    };
    return(
        <div>
            <NavLink to={'/sign-up'}>
                <div className={styles.containerButtonSignUp}>
                    <button className={styles.buttonSignUp}>Sign up</button>
                </div> 
            </NavLink>                   
            <form onSubmit={handleSubmit(signIn)} className={styles.containerForm}>
                <h3 className={styles.titleLogin}>Sign in to App</h3>
                <input className={styles.inputLogin} type="email" name="email" placeholder="email@example.com" ref={register({...validators, pattern:{value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,  message: 'Invalid email address'} })}/>               
                <p className={styles.errors}>{errors.email && errors.email.message}</p>
                <input className={styles.inputLogin} type="password" name="password" placeholder="password" ref={register({...validators, pattern:{value: /^[A-Z0-9_-]{8,12}$/i,  message: '8 to 12 characters: Latin, numbers, underscore and hyphen'} })}/>                
                <p className={styles.errors}>{errors.password && errors.password.message}  </p> 
                <button className={styles.buttonLogin} disabled={(errors.email && errors.email.message) || (errors.password && errors.password.message)}>Sign in</button>
            </form>
        </div>
    )
}

export default SignIn;