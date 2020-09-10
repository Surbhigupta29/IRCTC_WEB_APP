const dotenv = require('dotenv');
const mongoose = require('mongoose');
const logger = require('./logger/logger');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.database.replace(
  '<password>',
  process.env.database_password
);
//console.log(process.env);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('MongoDB is connected');
  })
  .catch((err) => {
    logger.error(
      `MongoDB connection unsuccessful, retry after 5 seconds.${err}`
    );
  });

const port = process.env.port;
app.listen(port, () => {
  logger.info(`Server is listening on ${port}`);
});
