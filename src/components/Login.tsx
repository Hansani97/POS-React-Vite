import React, {useState} from "react";
import {Link} from "react-router-dom";
import AxiosInstance from "../config/AxiosInstance.ts";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {

            const response = await AxiosInstance.post('/user/login', {
                email, password
            });
            const expireationDate = new Date();
            expireationDate.setDate(expireationDate.getDate() + 2);

            const cookieValue = encodeURIComponent('token') + '='
                + encodeURIComponent(response.data)
                + '; expires='
                + expireationDate.toUTCString()
                + '; path=/';
            document.cookie = cookieValue;

            console.log(response.data);

            setEmail('');
            setPassword('');


        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                   onChange={(e) => {
                                       setEmail(e.target.value)
                                   }}
                                   placeholder='Email here' className='form-control' value={email}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                   }}
                                   placeholder='Password here' className='form-control' value={password}/>
                            <br/>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className='btn btn-primary col-12' onClick={login}>Login</button>
                        <br/>
                        <br/>
                        <Link className='btn btn-outline-dark col-12' to='/signup'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;