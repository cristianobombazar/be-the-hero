import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';

export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const history = useHistory();

  async function handleRegister(event){
    event.preventDefault();

    const data = {name, email, whatsapp, city, uf};
    try{
      const result = await api.post('ngo', data);
      alert(`You access id ${result.data.id}`);
      history.push('/')
    }catch (err) {
      alert('Error to register your NGO.');
    }
    
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Register</h1>
          <p>
            Do your registration and help people to find cases from your NGO.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Don't have an account?
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="UF" 
              style={ { width: 80} }
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </div>

  );
}
