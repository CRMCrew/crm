export const getWinningOffer = (offers) => {
  const o = [
    { price: 100, offer: 125 },
    { price: 100, offer: 120 },
  ];

  offers.sort(
    (a, b) => parseInt(a.offer) - parseInt(a.price) - (b.offer - b.price)
  );

  const offer = offers[offers.length - 1];

  console.log(
    'results11',
    parseInt(offer.offer - offer.price),
    'price',
    offer.price
  );
  const result = parseInt(offer.offer - offer.price);
  return result;
};
