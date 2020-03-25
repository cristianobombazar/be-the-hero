import React, { useState } from 'react';
import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../../services/api';

export default function RegisterIncident() {

  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ngoId = localStorage.getItem('ngo_id');

  async function handleNewCase(e) {
    e.preventDefault();

    const data = {title, description, value};

    try{
        await api.post('incident', data, {
          headers: {
            Authorization: ngoId
          }
        });
        history.push('/profile');
    }catch(err) {
      alert('Erro while registering a new case');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Register new case</h1>
          <p>
            Describe the case in details to find your hero.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Back to home
          </Link>
        </section>

        <form onSubmit={handleNewCase}>
          <input 
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Value"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}