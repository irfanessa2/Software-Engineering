import React, { useState } from "react"
import { Link , useNavigate} from 'react-router-dom'
import Validation from "../validations/LoginValidation"
import axios from 'axios'

import { login, logout } from '../data/user';
import { setSelected } from '../data/selected';
import styles from '../styles/page.module.css';

function Login(){
    React.useEffect(() => {
        logout();
    }, []);
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors]=useState({})
    const handleInput=(event)=>{
        setValues(prev =>({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = React.useCallback(() =>{
        setErrors(Validation(values));
        axios.post('http://localhost:8081/Login', values)
            .then(res => {
                if(res.data === "Success"){
                    login();
                    setSelected(0);
                    navigate('/Revenue');
                }else{
                    alert("User not found");
                }
            })
            .catch(err => console.log(err))
    }, [values, navigate, login, setSelected])

    return (
        <div className={styles.mainPage}>
            <div className={styles.loginContainer}>
                <div className={styles.welcomBack}>Welcome Back!</div>
                <div>Dont have an account yet?</div>
                <Link to="/Signup">Sign Up</Link>

                <div style={{marginTop: "16px"}} className={styles.loginContainer}>
                    <div>username</div>
                    <input type="email" placeholder='Enter Email' name='email'
                        onChange={handleInput} className={styles.tableInputStyle}/>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                    <div>password</div>
                    <input type="password" placeholder='Enter Password' name='password'
                        onChange={handleInput} className={styles.tableInputStyle}/>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>

                <div style={{marginTop: "16px"}} className={styles.tableInputButtonLabel} onClick={handleSubmit}>Log In</div>
            </div>
        </div>
    )
}

Login.displayName = 'Login';

export default React.memo(Login);
