const pg = require("pg");
const settings = require("./settings"); // settings.json


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const personName = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  } else {
  client.query("SELECT first_name, last_name, TO_CHAR(birthdate, 'yyyy-mm-dd') AS birthdate FROM famous_people WHERE UPPER(first_name) = UPPER($1)", [personName],  (err, result) => {
    if (err) {
      return console.error("error running query", err);
    } else {
      const persons = result.rows;
      console.log(`Searching ...`);
      console.log(`Found ${result.rowCount} person(s) by the name '${personName}':`);
        for (let i = 0; i < result.rowCount; i++) {
          console.log(`- ${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate}'`);
        }
      }
    });
  }
});

