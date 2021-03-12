import React, { useState, useEffect } from 'react';
import api from '../../../../apis/api';
import PendingRequestItem from './PendingRequestItem';
import moment from 'moment';
import { uid } from 'uid';
import { formatMoney } from '../../../../utils/formatting';

const PendingRequests = () => {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const getData = async (req, res) => {
      const { data } = await api.post('customers-inventory/get', {
        limit: 10,
        status: 0,
      });

      setGroups(data);
    };
    getData();
  }, []);

  const acceptProduct = async (group, isWithDeposit, customer, price) => {
    const items = group.inventory.items;
    const date = moment().format('DD-MM-YY HH:mm:ss');
    const originalPrice = formatMoney(items[3].text);
    const pdfParams = {
      itemId: group._id,
      customerId: customer._id,
      itemName: `${items[0].text} ${items[1].text} ${items[2].text}`,
      date: date,
      price: originalPrice,
      factureId: uid(16),
      ville: customer.ville,
      country: customer.country,
      postalCode: customer.postalCode,
      phone: customer.phone,
      userName: `${customer.firstName} ${customer.lastName}`,
    };

    console.log('saving pdf');
    await api.post(`pdf/save`, pdfParams);
    console.log('upding status');
    await api.put(`customers-inventory/update-one/${group._id}`, {
      status: 1,
    });
    console.log('removing from deposit');
    await api.patch('/customers/deposit/', {
      _id: customer.id,
      amount: -1 * price,
    });

    setGroups(groups.filter((g) => g._id !== group._id));
  };

  const deleteProduct = async (group) => {
    await api.delete(`customers-inventory/delete/${group._id}`);
    setGroups(groups.filter((g) => g._id !== group._id));
  };
  const renderHeader = () => {
    return (
      <div className={`customers-log__item header`}>
        <div>Customer</div>
        <div>Balance</div>
        <div>Product</div>
        <div>Price</div>
        <div>Expiration</div>
        <div className={`pending-requests__buttons`}>Actions</div>
        <div className={`textCenter`}>Remove from balance</div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      groups &&
      groups.map((group, index) => {
        return (
          <PendingRequestItem
            key={group._id}
            group={group}
            acceptProduct={acceptProduct}
            deleteProduct={deleteProduct}
            index={index}
          />
        );
      })
    );
  };

  return (
    <div className='pending-requests'>
      <div className='customers-log header'>{renderHeader()}</div>
      <div>{renderBody()}</div>
    </div>
  );
};

export default PendingRequests;
