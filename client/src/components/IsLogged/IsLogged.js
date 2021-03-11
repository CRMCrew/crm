import React, { useState, useEffect } from 'react';
import api from '../../apis/api';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/customersActions';
const IsLogged = (props) => {
  console.log('in iglogged');
  const history = useHistory();
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(props);
    const getUser = async () => {
      const { data } = await api.get('/refresh/');
      setUser(data);
      console.log(data);
      const customerDetails = {
        email: data.email,
        password: data.userPassword,
      };

      const user = await props.login(customerDetails, false);
      if (user) {
        setTimeout(() => {
          history.push('/home');
        }, 700);
      } else {
        history.push('/');
      }
      //eslint-disable-next-line
    };

    getUser();
  }, []);

  return user && <div className='is-logged'> </div>;
};

const stateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};
export default connect(stateToProps, { login })(IsLogged);
