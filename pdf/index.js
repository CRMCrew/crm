module.exports = ({
  factureId,
  userName,
  phone,
  receiptId,
  country,
  postalCode,
  ville,
  itemName,
  price,
  customerID,
  itemID,
}) => {
  const today = new Date();
  let address = '';
  if (ville) address = ville;
  if (postalCode) address = `${address}, ${postalCode}`;
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>PDF Result Template</title>
      <style>
        .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica',
        color: #555;
        }
        .margin-top {
        margin-top: 50px;
        }
        .justify-center {
        text-align: center;
        }
        .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
        }
        .invoice-box table td {
       
        vertical-align: top;
        }
        .invoice-box table tr td:nth-child(2) {
        text-align: right;
        }
        .invoice-box table tr.top table td {
        padding-bottom: 20px;
        }
        .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
        }
        .invoice-box table tr.information table td {
      
        }
        .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
        }
        .invoice-box table tr.details td {
        padding-bottom: 20px;
        }
        .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
        }
        .invoice-box table tr.item.last td {
        border-bottom: none;
        }
        .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
        }
        @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
        width: 100%;
        display: block;
        text-align: center;
        }
        .invoice-box table tr.information table td {
        width: 100%;
        display: block;
        text-align: center !important;
        }
  
        
        }
        .company-details td {
              text-align: right;
        }
  
        .text-right {
            text-align: right !important;
        }
        .text-center {
            text-align: center !important;
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <img
                      src="https://crm-server-001.herokuapp.com/static/media/logo.d2424f62.png"
                      style="width: 100%; max-width: 156px"
                    />
                  </td>
                  <td
                    style="color: #7f9900; font-size: 1.5rem; font-weight: bold"
                  >
                    PAYÉ
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="top">
            <th colspan="2" style="font-size: 1.3em;padding-bottom:1rem">Facture :#${factureId}</th>
          </tr>
          <tr class="top">
            <td colspan="2"><hr /></td>
          </tr>
          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    <table style="margin-bottom:1rem">
                      <tr>
                        <th>Facturé à:</th>
                      </tr>
                      <tr>
                        <td>${userName}</td>
                      </tr>
                      <tr>
                        <td>${phone}</td>
                      </tr>
                  <tr>
                        <td>${address}</td>
                      </tr>
                  <tr>
                        <td>${country}</td>
                      </tr>
                      </tr>
                    </table>
                  </td>
                  <td><table style="margin-bottom:1rem" class="company-details">
                      <tr>
                        <th class="text-right">Payé à:</th>
                      </tr>
                      <tr>
                        <td>CAP DE FRANCE contact@cap-de-france.com</td>
                      </tr>
                      <tr>
                        <td>+33 (0)9 71 07 82 21</td>
                      </tr>
                  <tr>
                        <td>au capital de 650 000,00 €, inscrite au RCS de</td>
                      </tr>
                  <tr>
                        <td>Paris sous le nom de CAP 50 avec le numero de</td>
                      </tr>
                      <tr>
                          <td>siret 52037291300027</td>
                        </tr>
                        <tr>
                          <td>3 RUE DE SIAM 75116 PARIS</td>
                        </tr>
                     
                    </table></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="heading">
            <td>Références</td>
          </tr>
          <tr class="item">
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th class="text-center">Montant</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="text-center">${itemName}</td><td class="text-center">${price}</td>
                </tr>
                </tbody>
                <tfoot>
                    <tr class="heading">
                        <td>
                            &nbsp;
                        </td>
                        <td class="text-center">
                            Sous Total ${price}
                        </td>
                      </tr>
  
                      <tr class="heading">
                       <td>&nbsp;</td>
                          <td class="text-center"> 
                          Total ${price}
                      </td>
                  </tr>
                    </tr>
                </tfoot>
            </table>
          </tr>
        </table>
       
      </div>
    </body>
  </html>
  
    `;
};
