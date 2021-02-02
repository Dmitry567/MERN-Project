import React, {useContext,useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

export const AuthPage = () => {
   const auth = useContext(AuthContext);
   const message = useMessage();
   const {loading, request, error, clearError} = useHttp()
   const [form, setForm] = useState({
      email: '', password: ''
   })

   useEffect( () => {
     message(error)
     clearError()
   }, [error, message, clearError])

    
   useEffect( () => {
     window.M.updateTextFields()
   }, []);


   const changeHandler = event => {
     setForm({ ...form, [event.target.name]: event.target.value })
   }

  const loginHandler = async() => {
     try {
       const data = await request('/api/auth/login', 'POST', {...form})
       auth.login(data.token, data.userId)
     } catch (e) {}
  }

  const registerHandler = async() => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message);
    } catch (e) {}
 }

  return (
    <div className="row">
     <div className="col s6 offset-s3">
       <h1>Shorten the Link</h1>
       <div class="card blue darken-1">
        <div class="card-content white-text">
          <span class="card-title">Authorization</span>
          <div>

          <div className="input-field">
            <input 
            placeholder="Enter Email" 
            id="email" 
            type="text"
            name="email"
            className="yellow-input"
            onChange={changeHandler} 
            />
            <label htmlFor="first_name">Email</label>
          </div>

          <div className="input-field">
            <input 
            placeholder="Enter Password" 
            id="password" 
            type="password"
            name="password"
            className="yellow-input"
            onChange={changeHandler} 
            />
            <label htmlFor="first_name">Password</label>
          </div>
      
          </div>
        </div>
        <div class="card-action">
           <button 
           className="btn yellow darken-4" 
           style={{marginRight: 10}}
           disabled={loading}
           onClick={loginHandler}
           >
             Enter
             </button>
           <button 
           className="btn gray lighten-1 black-text"
           onClick={registerHandler}
           disabled={loading}
           >
             Register
             </button>
        </div>
      </div>
     </div>
    </div>
  )
}