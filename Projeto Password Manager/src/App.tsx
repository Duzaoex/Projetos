import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';

interface Service {
  id: number;
  nomeServico: string;
  login: string;
  senha: string;
  url: string;
}

function App(): JSX.Element {
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState<Service>({
    id: 0,
    nomeServico: '',
    login: '',
    senha: '',
    url: '',
  });
  const [services, setServices] = useState<Service[]>([]);
  const [hidePasswords, setHidePasswords] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const isFormValid = () => {
    const { nomeServico, login, senha } = formValues;
    const senhaRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;

    return (
      nomeServico !== ''
      && login !== ''
      && senha.length >= 8
      && senha.length <= 16
      && senha.match(senhaRegex) !== null
    );
  };

  const handleCadastrar = () => {
    const { nomeServico, login, senha, url } = formValues;
    const newService: Service = {
      id: Date.now(),
      nomeServico,
      login,
      senha,
      url,
    };

    setServices([...services, newService]);
    setFormValues({
      id: 0,
      nomeServico: '',
      login: '',
      senha: '',
      url: '',
    });
    setShowForm(false);
  };

  const handleRemover = (id: number) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
  };

  return (
    <div>
      <h1>Gerenciador de Senhas</h1>

      {!showForm ? (
        <button type="button" onClick={ handleToggleForm }>
          Cadastrar nova senha
        </button>
      ) : (
        <Form
          onCancel={ handleToggleForm }
          formValues={ formValues }
          onInputChange={ handleInputChange }
          isFormValid={ isFormValid }
          onCadastrar={ handleCadastrar }
        />
      )}

      <div>
        <input
          type="checkbox"
          id="hidePasswordsCheckbox"
          checked={ hidePasswords }
          onChange={ () => setHidePasswords(!hidePasswords) }
        />
        <label htmlFor="hidePasswordsCheckbox">Esconder senhas</label>
      </div>

      {services.length === 0 ? (
        <p>Nenhuma senha cadastrada</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={ service.id }>
              <a href={ service.url }>{service.nomeServico}</a>
              <br />
              <p>
                Login:
                <span>{service.login}</span>
              </p>
              <p>
                Senha:
                { hidePasswords ? '********' : service.senha }
              </p>
              <button
                type="button"
                onClick={ () => handleRemover(service.id) }
                data-testid="remove-btn"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
