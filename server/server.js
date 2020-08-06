const midtransClient = require('midtrans-client');
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')

const port = 4000
const app = express()

app.use(cors())
app.use(express.json());


let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY
});

const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
doc.useServiceAccountAuth(require('./google.json'));
doc.loadInfo();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', function (request, response) {
    const order_id = uuidv4();
    r = request.body;

    console.log('requestBody', r)

    const sheet = doc.sheetsByIndex[0];

    let parameter = {
        "transaction_details": {
            "order_id": order_id,
            "gross_amount": parseInt(r.productPrice)
        },
        "credit_card": {
            "secure": true
        },
        "customer_details": {
            "first_name": r.customerFirstName,
            "last_name": r.customerLastName,
            "email": r.customerEmail,
            "phone": r.customerPhone
        }
    };

    console.log('parameter', parameter)

    snap.createTransaction(parameter)
        .then((transaction) => {
            // transaction token
            let transactionToken = transaction.token;
            console.log('trxToken', transactionToken)

            sheet.addRow({
                productName: r.productName,
                productType: r.productType,
                productPrice: r.productPrice,
                customerFirstName: r.customerFirstName,
                customerLastName: r.customerLastName,
                customerEmail: r.customerEmail,
                customerPhone: r.customerPhone,
                orderId: order_id
            }).then(
                response.send({ transactionToken })
            );
        })
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

