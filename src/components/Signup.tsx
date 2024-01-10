import React, {useState} from "react";
import {Link} from "react-router-dom";
import AxiosInstance from "../config/AxiosInstance.ts";

const Signup:React.FC=()=>{
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const signup = async () => {
        try {

            const response = await AxiosInstance.post('/user/register', {
                fullName,email,password
            });
            console.log(response);

            setFullName('');
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
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="name" >Full Name</label>
                            <input type="text"
                                   onChange={(e)=>setFullName(e.target.value)}
                                   placeholder='Name here' className='form-control' value={fullName}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="email" >Email</label>
                            <input type="email"
                                   onChange={(e)=>setEmail(e.target.value)}
                                   placeholder='Email here' className='form-control' value={email}/>
                            <br/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="password" >Password</label>
                            <input type="password"
                                   onChange={(e)=>setPassword(e.target.value)}
                                   placeholder='Password here' className='form-control' value={password}/>
                            <br/>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className='btn btn-primary col-12' onClick={signup}>Register Now</button>
                        <br/>
                        <br/>
                        <Link to='/login' className='btn btn-outline-dark col-12' >Already have an Account</Link>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;