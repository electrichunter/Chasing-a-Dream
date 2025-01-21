"use client";  // Client component olarak işaretliyoruz
import React, { useState } from 'react';
import './login.css'; // Stil dosyasını import ettik

const SignUpLogin = () => {
  const [isRegister, setIsRegister] = useState(false); // Form geçişi için state

  const handleToggle = (isRegisterForm: boolean) => {
    setIsRegister(isRegisterForm);  // Form geçişini kontrol et
  };

  return (
    <div className="body">
      <div className="veen">
        <div className="login-btn splits">
          <p>Already an user?</p>
          <button
            className={isRegister ? '' : 'active'}
            onClick={() => handleToggle(false)}
          >
            Login
          </button>
        </div>
        <div className="rgstr-btn splits">
          <p>Don't have an account?</p>
          <button
            className={isRegister ? 'active' : ''}
            onClick={() => handleToggle(true)}
          >
            Register
          </button>
        </div>

        <div className={`wrapper ${isRegister ? 'move' : ''}`}>
          {/* Login Form */}
          <form id="login" className={isRegister ? 'hidden' : 'active'}>
            <h3>Login</h3>
            <div className="mail">
              <input type="email" name="mail" required />
              <label>Mail or Username</label>
            </div>
            <div className="passwd">
              <input type="password" name="password" required />
              <label>Password</label>
            </div>
            <div className="submit">
              <button className="dark">Login</button>
            </div>
          </form>

          {/* Register Form */}
          <form id="register" className={isRegister ? 'active' : 'hidden'}>
            <h3>Register</h3>
            <div className="name">
              <input type="text" name="fullname" required />
              <label>Full Name</label>
            </div>
            <div className="mail">
              <input type="email" name="mail" required />
              <label>Mail</label>
            </div>
            <div className="uid">
              <input type="text" name="username" required />
              <label>User Name</label>
            </div>
            <div className="passwd">
              <input type="password" name="password" required />
              <label>Password</label>
            </div>
            <div className="submit">
              <button className="dark">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpLogin;
