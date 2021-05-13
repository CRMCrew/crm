import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import api from '../../../../apis/api';
import { formatMoney } from '../../../../utils/formatting';
import { deposits } from '../../../../utils/static_data';

const DespositLogs = () => {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const getData = async (req, res) => {
      const { data } = await api.get('/deposit-logs/getAll', {
        limit: 10,
        status: 0,
      });

      setGroups(data);
    };
    getData();
  }, []);

  const renderHeader = () => {
    return (
      <div className={`customers-log__item header`}>
        <div>Created at</div>
        <div>Customer</div>
        <div>Type</div>
        <div>Method</div>
        <div>Amount</div>
        <div>Admin</div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      groups &&
      groups.map((group, index) => {
        console.log(group);
        const homepageLink = `/backoffice/customers/details/${group.customer._id}`;
        const createAt = moment(group.createdAt).format('DD-MM-YY HH:mm:ss');
        const amount = formatMoney(group.amount);
        const method = group.method;
        return (
          <div
            className={`customers-log__item ${index % 2 === 0 ? 'alt' : ''}`}
          >
            <div>{createAt}</div>
            <div>
              <Link className='link' to={homepageLink}>
                {group.customer.firstName} {group.customer.lastName}
              </Link>
            </div>
            <div>{deposits[group.depositType]}</div>
            <div>{method}</div>
            <div>{amount}</div>

            <div>
              {group.user.firstName} {group.user.lastName}
            </div>
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
export default DespositLogs;
