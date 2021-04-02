const config = require('./config');
const {Client} = require('pg');

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let foramttedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(foramttedTimeStamp, statement, parameters);
}

const isProduction = (config.NODE_ENV === 'production');
const CONNECTION = {
  connectionString: config.DATABASE_URL,
  //ssl: isProduction,  // See note below
  ssl: { rejectUnauthorized: false },
}

module.exports = {
  async dbQuery(statement, ...parameters) {
    let client = new Client(CONNECTION);
    await client.connect();
    logQuery(statement, parameters);
    let results = await client.query(statement, parameters);
    await client.end();

    return results;

  }
}