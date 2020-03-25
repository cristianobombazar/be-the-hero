import React, { useState }  from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import './styles.css';
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

export default function Logon() {

  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
      e.preventDefault();
      try{
        const response = await api.post('session', {id});
        localStorage.setItem('ngo_id', id);
        localStorage.setItem('ngo_name', response.data.name);
        history.push('/profile')
      }catch(err) {
        alert('The given id doesn\'t exist');
      }
  }


  return (
    <div className="logon-container">
      <section className="form">

        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>

          <h1>Faça seu logon</h1>
          <input 
            placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">Log in</button>

          <Link to="register" className="back-link">
            <FiLogIn size={16} color="#E02041" />
            Don't have an account?
          </Link>

        </form>

      </section>

      <img src={heroesImg} alt="heroes" />

    </div>
  );
}