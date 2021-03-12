import React, { useState } from 'react';

const Password = () => {
  const [password, setPassword] = useState({
    originalPassword: '',
    newPassword: '',
    confirmation: '',
  });
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPassword({ ...password, [name]: value });
  };
  return (
    <div>
      <div className='user-info'>
        <div className='user-info__container'>
          <div className='flex'>
            <label>Mot de passe actuel:</label>
            <input
              type='password'
              placeholder='Mot de passe actuel'
              name='originalPassword'
              value={password.originalPassword}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Nouveau mot de passe:</label>
            <input
              type='password'
              placeholder='Nouveau mot de passe'
              name='newPassword'
              value={password.newPassword}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Confirmez:</label>
            <input
              type='password'
              placeholder='Confirmez'
              name='confirmation'
              value={password.confirmation}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
