import React from 'react';
import img from '../../../images/logo.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../../utils/formatting';
import { logOut } from '../../../actions/customersActions';
const Header = (props) => {
  const setLogOut = () => {
    console.log('logout');
    props.logOut(props.customer);
    window.location = '/';
  };
  const { customer } = props;
  return (
    <header className='header-container'>
      <div className='header-container__brand'>
        <Link to='/backoffice/dashboard'>
          <img src={img} alt='logo' />
        </Link>
      </div>
      <div className='header-container__toolbar'>
        <div>
          <div className='header-container__item'>
            <i className='fas fa-user'></i>
            {customer.firstName} {customer.lastName}
          </div>
          <div className='header-container__item'>
            <i className='fas fa-money-bill'></i>
            {formatMoney(customer.balance)}
          </div>
          <div className='header-container__item' onClick={setLogOut}>
            <i className='fas fa-sign-out-alt header-container__icon-2'></i>
            (Déconnexion)
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps, { logOut })(Header);
