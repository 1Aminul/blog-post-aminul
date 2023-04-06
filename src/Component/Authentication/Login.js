import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const {LogIn} = useContext(AuthContext)
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const handlerLogin = (data)=>{
        LogIn(data.email, data.password)
        .then(res=>{
            const user = res.user
            console.log(user)
            reset()
            navigate(from, {replace: true})
        }).catch(e=>setError(e.message) )
    }

    

    return (
        <div className='flex justify-center items-center my-32'>
        <div className='w-96 shadow-xl rounded-lg p-4'>
            <h2 className="text-2xl font-bold text-accent text-center">LOGIN</h2>
            <form onSubmit={handleSubmit(handlerLogin)}>
               
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input {...register("email")} type='email' className='input input-bordered w-full' />
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type='password' {...register("password")} className='input input-bordered w-full' />
                <input type="submit" value='Login' className='w-full bg-accent rounded py-3 mt-6 text-white cursor-pointer' />
            </form>
            <label className="label">
                <span className="label-text text-error">{error}</span>
            </label>
            <p className='my-6 text-center'>Don't have an account? <Link className='text-secondary' to='/register'>Register</Link> </p>

        </div>
    </div>
    );
};

export default Login;