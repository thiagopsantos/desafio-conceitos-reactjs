import React from "react";

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() { 
    const response = await api.post('repositories', { 
      title: `New Repository ${Date.now()}`, 
      url:  'http://minhaapi.com.br/repos', 
      techs: ['Javascript', 'Node.js', 'ReactJS'] 
    }); 

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if (response.status === 204) {
       setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>            
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
