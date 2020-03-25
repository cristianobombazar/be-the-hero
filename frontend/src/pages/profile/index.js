import React, { useEffect, useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

export default function Profile() {

  const history = useHistory();
  const [incidents, setIncidents] = useState([]);

  const ngoName = localStorage.getItem('ngo_name');
  const ngoId = localStorage.getItem('ngo_id');

  useEffect(() => {
      api.get('/profile', {
        headers: {
          Authorization: ngoId
        }
      }).then( (response) => {
        setIncidents(response.data);
      })
  }, [ngoId]);


  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incident/${id}`, {
        headers: {
          Authorization: ngoId
        }
      });


      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch(err){
      alert('Error while deleting incident. Try again!');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/')
  }

  return (
      <div className="profile-container">
          <header>
            <img src={logoImg} alt="Be The Hero"/>
            <span> Welcome, {ngoName}!</span>

            <Link className="button" to="/incident/new">New case </Link>
            <button type="button" onClick={handleLogout}>
              <FiPower size={18} color="#E02041"/>
            </button>
          </header>

          <h1>Cases</h1>

          <ul>
            {incidents.map(incident => (
              <li key={incident.id}>
                  <strong>CASE:</strong>
                  <p>{incident.title}</p>
    
                  <strong>DESCRIPTION: </strong>
                  <p>{incident.description}</p>
    
                  <strong>Value: </strong>
                  <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
    
                  <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                    <FiTrash2 size={20} color="#a8a8b3"/>
                  </button>
              </li>
            ))}
          </ul>

      </div>
  );
}