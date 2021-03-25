import React from 'react';
import styles from './SignIn.module.css';
import styleUp from './SignUp.module.css';
import {NavLink} from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUp = (props) => {
    
    const {register, handleSubmit, errors} = useForm();

    const validators = {
        required: 'The field can not be empty'
    };
   
    const onSubmit = (newUser) => {        
        const addNewUser = () => {
            props.setUsers([...props.users, newUser]);
            localStorage.setItem('users', JSON.stringify([...props.users, newUser]));
        }    
        if(props.users.length !== 0) {
            props.users.find(item => (item.name === newUser.name || item.email === newUser.email) ) ? alert('this name or email is already in use ')  : addNewUser();
        } else {
            addNewUser();      
        }
        
    };
    console.log(props.users);
    return(
        <div>
            <NavLink to={'/sign-in'}>
                <div className={styles.containerButtonSignUp}>
                    <button className={styles.buttonSignUp}>Sign in</button>
                </div> 
            </NavLink>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.containerForm}>
                <h3 className={styleUp.titleLogin}>Sign Up</h3>
                <input className={styles.inputLogin} type="text" name="name" placeholder="Name" ref={register({...validators, minLength: {value: 2, message: 'The field cannot be empty'},maxLength: {value: 10, message: 'No more than 10 characters'}, pattern:{value: /[A-Z]{2,10}/i,  message: 'only Latin'} })}/>               
                <p className={styles.errors}>{errors.name && errors.name.message}</p>
                <input className={styles.inputLogin} type="email" name="email" placeholder="email@example.com" ref={register({...validators, pattern:{value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,  message: 'Invalid email address'} })}/>               
                <p className={styles.errors}>{errors.email && errors.email.message}</p>
                <input className={styles.inputLogin} type="password" name="password" placeholder="password" ref={register({...validators, pattern:{value: /^[A-Z0-9_-]{8,12}$/i,  message: '8 to 12 characters: Latin, numbers, underscore and hyphen'} })}/>                
                <p className={styles.errors}>{errors.password && errors.password.message}  </p>  
                <button type="submit" className={styles.buttonLogin} disabled={(errors.name && errors.name.message) || (errors.email && errors.email.message) || (errors.password && errors.password.message)}>Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;