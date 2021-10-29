import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../../../apis/api';
import { formatMoney } from '../../../../utils/formatting';
const DWaitingRequests = ({ user }) => {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const getData = async (req, res) => {
      const { data } = await api.post('customers-inventory/get', {
        limit: 10,
        status: 0,
      });
      console.log(data);
      setGroups(
        data.filter(
          (x) =>
            x.customer.owner?._id === user._id ||
            user.role.type.toString().toLowerCase() === 'admin'
        )
      );
    };
    getData();
  }, []);

  const renderHeader = () => {
    return (
      <div className={`customers-log__item header`}>
        <div>Customer</div>
        <div>Balance</div>
        <div>Product</div>
        <div>Price</div>
        <div>Expiration</div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      groups &&
      groups.map((group, index) => {
        const homepageLink = `/backoffice/customers/details/${group.customer._id}`;
        console.log(group.customer._id);
        const price = formatMoney(group.inventory.items[3].text);
        const balance = formatMoney(group.customer.balance);
        const date = moment(group.expiration).format('DD-MM-YY HH:mm:ss');

        return (
          <div
            className={`customers-log__item ${index % 2 === 0 ? 'alt' : ''}`}
          >
            <div>
              <Link className='link' to={homepageLink}>
                {group.customer.firstName} {group.customer.lastName}
              </Link>
            </div>
            <div>{balance}</div>
            <div>
              <Link to='/backoffice/manage/' className='link'>
                {group.inventory.items[0].text}
              </Link>
            </div>
            <div>{price}</div>
            <div>{date}</div>
          </div>
        );
      })
    );
  };

  return (
    <div>
      <div className='customers-log header'>{renderHeader()}</div>
      <div>{renderBody()}</div>
    </div>
  );
};

const propToState = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(propToState)(DWaitingRequests);
