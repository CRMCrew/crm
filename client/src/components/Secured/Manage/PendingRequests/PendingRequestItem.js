import React, { useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../../../utils/formatting';

const PendingRequestItem = ({ group, acceptProduct, deleteProduct, index }) => {
  const price = formatMoney(group.inventory.items[3].text);
  const balance = formatMoney(group.customer.balance);
  const date = moment(group.expiration).format('DD-MM-YY HH:mm:ss');
  const checkboxRef = useRef(null);
  const homepageLink = `/backoffice/customers/details/${group.customer._id}`;

  return (
    <div className={`customers-log__item ${index % 2 === 0 ? 'alt' : ''}`}>
      <div>
        <Link className='link' to={homepageLink}>
          {group.customer.firstName} {group.customer.lastName}
        </Link>
      </div>
      <div>{balance}</div>
      <div>{group.inventory.items[0].text}</div>
      <div>{price}</div>
      <div>{date}</div>
      <div className={`pending-requests__buttons`}>
        <button
          className='button bg-success'
          onClick={() =>
            acceptProduct(
              group,
              checkboxRef.current.checked,
              group.customer,
              group.inventory.items[3].text
            )
          }
        >
          J'accepte
        </button>
        <button
          className='button bg-warning'
          onClick={() => deleteProduct(group)}
        >
          Rejeter
        </button>
      </div>
      <div className={`textCenter`}>
        <input type='checkbox' defaultChecked='true' ref={checkboxRef} />
      </div>
    </div>
  );
};

export default PendingRequestItem;
