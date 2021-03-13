import React, { useState } from 'react';
import img from '../../../images/logo.png';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { formatMoney } from '../../../utils/formatting';
import { logOut } from '../../../actions/customersActions';
import api from '../../../apis/api';
import FormModel from '../../FormModel/FormModel';
const Header = (props) => {
  const { user, customer } = props;
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [widthdrawAmount, setwithdrawAmount] = useState(0);
  const history = useHistory();

  const setLogOut = () => {
    props.logOut();
    props.logOut(customer);
    window.location = '/';
  };

  const backToAdmin = () => {
    props.logOut();
    history.push('/backoffice/customers/');
  };
  const renderAdminButton = () => {
    return (
      user.firstName && (
        <div className='header-container__item' onClick={backToAdmin}>
          <i className='fas fa-user-shield header-container__icon-1'></i>
        </div>
      )
    );
  };

  const addWithdrawRequest = async () => {
    const body = { amount: widthdrawAmount, owner: customer._id };
    const withdraw = await api.post('/withdraw/save', body);
    console.log('widthdraw', withdraw);
  };

  const renderWithdrawForm = () => {
    return (
      <FormModel isVisible={isWithdraw}>
        <div className='home-page-container__customer_add_item withdraw-model'>
          <h2 className='add-item-header'>CONFIRMATION RETIRER DEMANDER</h2>
          <p>veuillez saisir le montant que vous souhaitez retirer:</p>
          <div>
            <input
              type='number'
              placeholder='montant à retirer'
              value={widthdrawAmount}
              onChange={(e) => setwithdrawAmount(e.target.value)}
            />
          </div>

          <div className='add-item-buttons'>
            <button className='button bg-success' onClick={addWithdrawRequest}>
              envoyer une demande
            </button>
            <button
              className='button bg-warning'
              onClick={() => {
                setIsWithdraw((prev) => !prev);
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      </FormModel>
    );
  };
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
            <i class='fas fa-file-signature'></i>
            <a
              href='../../../../contrat.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              Contrat
            </a>
          </div>
          <div className='header-container__item'>
            <i class='far fa-file-pdf'></i>
            <a
              href='../../../../kbis.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              Kbis
            </a>
          </div>
          <div className='header-container__item'>
            <i className='fas fa-user'></i>
            {customer.firstName} {customer.lastName}
          </div>
          <div
            className='header-container__item'
            onClick={() => {
              setIsWithdraw((prev) => !prev);
            }}
          >
            <i className='fas fa-money-bill'></i>
            {formatMoney(customer.balance)}
          </div>
          <div className='header-container__item' onClick={setLogOut}>
            <i className='fas fa-sign-out-alt header-container__icon-2'></i>
            (Déconnexion)
          </div>
          {renderAdminButton()}
        </div>
      </div>
      {renderWithdrawForm()}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps, { logOut })(Header);
