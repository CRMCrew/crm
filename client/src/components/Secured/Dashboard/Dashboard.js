import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import CustomerLogs from './DCustomersLogs/CustomersLogs';
import DWaitingRequests from './NewPending/DWaitingRequests';
import DepositLogs from './DepoistLogs/DepoistLogs';

import { containerVariants, itemVariants } from './variants';
import PendingWithdraw from '../../PendingWithdraw/PendingWithdraw';
import CreditcardLog from '../../CreditcardLog/CreditcardLog';

const Dashboard = ({ customer }) => {
  useEffect(() => {
    document.title = 'Sa Sinef - Dashboard';
  }, []);

  return (
    <div className='dashboard'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        div
        className='dashboard__cards'
      >
        <motion.div
          className='card-container  dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-warning'>
            Pending order requests
          </div>
          <DWaitingRequests />
        </motion.div>

        <motion.div
          className='card-container  dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-warning'>
            Pending Withdraw requests
          </div>
          <PendingWithdraw />
        </motion.div>

        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-success'>
            Latest creditcard depoist
          </div>
          <CreditcardLog />
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-blue'>
            Last Customers Connection
          </div>
          <CustomerLogs />
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-info'>Last Withdrawals</div>
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-info'>Last Desposits</div>
          <DepositLogs />
        </motion.div>
      </motion.div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
    user: state.userReducer,
  };
};
export default connect(mapStateToProps)(Dashboard);
