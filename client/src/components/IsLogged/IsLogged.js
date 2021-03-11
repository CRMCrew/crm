import React, { useState, useEffect } from 'react';
import api from '../../apis/api';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/customersActions';
const IsLogged = (props) => {
  console.log('p', props.customer);
  const history = useHistory();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await api.get('/refresh/');
      setUser(data);
      const customerDetails = {
        email: data.email,
        password: data.userPassword,
      };

      await props.login(customerDetails, false);
      //eslint-disable-next-line
      history.push('/home');
    };

    getUser();
  }, []);

  return user && <div>hello</div>;
};

const stateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};
export default connect(stateToProps, { login })(IsLogged);
