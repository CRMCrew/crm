import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
const CustomerLogItem = ({ log, index }) => {
  const homepageLink = `/backoffice/customers/details/${log.customer._id}`;
  const date =
    index === -1 ? 'Date' : moment(log.createdAt).format('DD-MM-YYYY HH:mm:ss');
  const ownerName = log.owner
    ? `${log.owner.firstName} ${log.owner.lastName}`
    : 'UnControlled';
  return !log.customer ? null : (
    <div className={`customers-log__item ${index % 2 === 0 ? 'alt' : ''}`}>
      <div>{date}</div>

      {parseInt(index) !== -1 ? (
        <div>
          <Link to={homepageLink} className='link'>
            {log.customer.firstName} {log.customer.lastName}
          </Link>
        </div>
      ) : (
        <div>
          {log.customer.firstName} {log.customer.lastName}
        </div>
      )}

      <div>{ownerName}</div>
    </div>
  );
};

export default CustomerLogItem;
