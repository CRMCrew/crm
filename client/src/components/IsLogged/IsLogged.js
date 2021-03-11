import React, { useState, useEffect } from 'react';
import api from '../../apis/CustomerApi';
import adminApi from '../../apis/api';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/customersActions';
import { login as adminLogin } from '../../actions/userActions';
const IsLogged = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const path = props.location.pathname;
  const isAdmin = path.indexOf('backoffice') > -1;
  const mainPath = isAdmin ? '/backoffice' : '/';

  const setData = async (data) => {
    console.log('is admin', data);
    setUser(data);
    console.log('data', data);
    const customerDetails = {
      email: data.email,
      password: data.userPassword,
    };
    if (!isAdmin) {
      const user = await props.login(customerDetails, false);
    } else {
      console.log('in admin login');
      const user = await props.adminLogin(customerDetails, false);
    }
  };

  console.log(path);
  useEffect(() => {
    console.log(props);
    let user = null;
    const getUser = async () => {
      try {
        if (!isAdmin) {
          const { data } = await api.post('/refresh/', { isAdmin });
          setData(data);
          user = data;
        } else {
          const { data } = await adminApi.post('/refresh/admin', {
            isAdmin: true,
          });
          setData(data);
          user = data;
        }
      } catch (error) {
        console.log('error', error);
        history.push(mainPath);
      }
      console.log('userrr', user);
      if (user) {
        console.log('user found yay');
        setTimeout(() => {
          history.push(path);
        }, 0);
      } else {
        history.push(mainPath);
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
export default connect(stateToProps, { login, adminLogin })(IsLogged);
