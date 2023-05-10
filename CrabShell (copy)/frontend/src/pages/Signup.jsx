import React, {useState} from "react"
import { Link, useNavigate } from 'react-router-dom'
import Validation from "../validations/SignupValidation"
import axios from 'axios';
import styles from '../styles/page.module.css';

function Signup(){
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        salary: '',
        type: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors]=useState({})
    const handleInput=(event)=>{
        setValues(prev =>({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit=() => {
        setErrors(Validation(values));
            axios.post('http://localhost:8081/Signup', values)
            .then(res => {
                alert('Successfuly Created!')
                navigate('/')
            })
            .catch(err => console.log(err))
    } 

    return(
        <div className={styles.mainPage}>
            <div className={styles.loginContainer}>
                <div className={styles.welcomBack}>Registration</div>

                <div style={{marginTop: "16px"}} className={styles.loginContainer}>
                    <div style={{display: 'flex'}}>
                        <div className={styles.loginContainer}>
                            <div>First Name</div>
                            <input type="text" placeholder='Enter First Name' name='first_name'
                                onChange={handleInput} className={styles.tableInputStyle}/>
                            {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                        </div>
                        <div className={styles.loginContainer}>
                            <div>Last Name</div>
                            <input type="text" placeholder='Enter Last Name' name='last_name'
                                onChange={handleInput} className={styles.tableInputStyle}/>
                            {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
                        </div>
                    </div>
                    <div className={styles.loginContainer}>
                        <div>Email</div>
                        <input type="email" placeholder='Enter Email' name='email' style={{width: "300px"}}
                            onChange={handleInput} className={styles.tableInputStyle}/>
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className={styles.loginContainer}>
                        <div>Password</div>
                        <input type="password" placeholder='Enter Password' name='password' style={{width: "300px"}}
                            onChange={handleInput} className={styles.tableInputStyle}/>
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div style={{display: 'flex'}}>
                        <div className={styles.loginContainer}>
                            <div>Salary</div>
                            <input type="text" placeholder='Enter Salary' name='salary'
                                onChange={handleInput} className={styles.tableInputStyle}/>
                            {errors.salary && <div className="text-danger">{errors.salary}</div>}
                        </div>
                        <div className={styles.loginContainer}>
                            <div>Employer Type</div>
                            <input type="text" placeholder='Enter Employer Type' name='type'
                                onChange={handleInput} className={styles.tableInputStyle}/>
                            {errors.type && <div className="text-danger">{errors.type}</div>}
                        </div>
                    </div>
                </div>

                <div style={{marginTop: "16px", marginBottom: "16px"}} className={styles.tableInputButtonLabel} onClick={handleSubmit}>Register</div>

                <div>Already have an account?{' '}<Link to="/">Login here</Link></div>
            </div>
        </div>
    )
}

Signup.displayName = 'Signup';

export default React.memo(Signup);
