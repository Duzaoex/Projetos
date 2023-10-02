import React from 'react';

interface FormProps {
  onCancel: () => void;
  formValues: {
    nomeServico: string;
    login: string;
    senha: string;
    url: string;
  };
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFormValid: () => boolean;
  onCadastrar: () => void;
}

function Form({
  onCancel,
  formValues,
  onInputChange,
  isFormValid,
  onCadastrar,
}: FormProps): JSX.Element {
  const validatePassword = () => {
    const { senha } = formValues;
    const senhaRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;

    return (
      senha.length >= 8
      && senha.length <= 16
      && senha.match(senhaRegex) !== null
    );
  };

  const isPasswordValid = validatePassword();
  const passwordCheckClassName = isPasswordValid
    ? 'valid-password-check'
    : 'invalid-password-check';

  return (
    <div>
      <label htmlFor="nomeServico">Nome do serviço</label>
      <input
        type="text"
        id="nomeServico"
        value={ formValues.nomeServico }
        onChange={ onInputChange }
      />

      <label htmlFor="login">Login</label>
      <input
        type="text"
        id="login"
        value={ formValues.login }
        onChange={ onInputChange }
      />

      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        id="senha"
        value={ formValues.senha }
        onChange={ onInputChange }
      />

      <label htmlFor="url">URL</label>
      <input
        type="text"
        id="url"
        value={ formValues.url }
        onChange={ onInputChange }
      />

      <div>
        <p className={ passwordCheckClassName }>
          Possuir 8 ou mais caracteres
        </p>
        <p className={ passwordCheckClassName }>Possuir até 16 caracteres</p>
        <p className={ passwordCheckClassName }>Possuir letras e números</p>
        <p className={ passwordCheckClassName }>Possuir algum caractere especial</p>
      </div>

      <button type="button" disabled={ !isFormValid() } onClick={ onCadastrar }>
        Cadastrar
      </button>
      <button type="button" onClick={ onCancel } data-testid="cancel-button">
        Cancelar
      </button>
    </div>
  );
}

export default Form;
