import React from 'react';
import styles from './SignIn.module.css';
import {NavLink, withRouter} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignIn = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const validators = {
        required: 'the field can not be empty '
    };

    const signIn = (value) => {
        console.log(props.users);
        props.users.find((item, index) => item.email === value.email && item.password === value.password) ? successToast() :  errorToast();
    };

    const successToast = () => {
        toast.success('Login completed successfully!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    
    const errorToast = () => {
        toast.error('Wrong login or password!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
                <ToastContainer
                    newestOnTop={false}
                    rtl={false}
                    pauseOnFocusLoss
                    className={styles.toast}
                />
            </form>
        </div>
    )
}

export default SignIn;