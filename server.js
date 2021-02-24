const express = require('express');
const upload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = new express.Router();
require('./db/mongoose');
const userRouter = require('./routers/userRouter');
const customerRouter = require('./routers/customerRouter');
const commentRouter = require('./routers/commentsRouter');
const filesRouter = require('./routers/filesRouter');
const InventoryRouter = require('./routers/InventoryRouter');
const InventoryItemRouter = require('./routers/InventoryItemRouter');
const customerSwitchRouter = require('./routers/customerSwitchRouter');
const customerLogsRouter = require('./routers/CustomerLogsRouter');
const customerInventoryRouter = require('./routers/CustomerInventoryRouter');
const headersRouter = require('./routers/headersRouter');
const depositLogsRouter = require('./routers/DepositLogsRouter');

const app = express();
const PORT = process.env.PORT || 5000;
const origin = process.env.ORIGIN || 'http://localhost:3000';
app.use(
  cors({
    credentials: true,
    origin: origin,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(upload());

app.use('/users', userRouter);
app.use('/customers', customerRouter);
app.use('/comments', commentRouter);
app.use('/files', filesRouter);
app.use('/headers', headersRouter);
app.use('/inventroy', InventoryRouter);
app.use('/customers-switch', customerSwitchRouter);
app.use('/inventroyItem', InventoryItemRouter);
app.use('/customers-logs', customerLogsRouter);
app.use('/customers-inventory', customerInventoryRouter);
app.use('/deposit-logs/', depositLogsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});
