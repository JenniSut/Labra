const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('kanta.db');

db.serialize( () => {

  let sql = "CREATE TABLE tilaukset (" +
   "id integer PRIMARY KEY NOT NULL, " +
   "tuote text, " +
   "tilauspvm date, " +
   "toimpvm date, " +
   "hinta real ," +
   "tyontekija text, " +
   "asiakas text," +
   "lisatieto text)";

  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Taulu 'Tilaukset' tehtiin");
  })

  sql = "CREATE TABLE kayttikset (" +
   "kayttajatunnus text PRIMARY KEY NOT NULL, " +
   "salasana text)";

  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Taulu 'kayttikset' tehtiin");
  })

  sql = "CREATE TABLE tyontekijat (" +
   "tyontekija_id integer PRIMARY KEY NOT NULL, " +
   "etunimi text," +
   "sukunimi text)";

   db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Taulu 'tyontekijat' tehtiin");
  })

  sql = "INSERT INTO `tyontekijat` (`tyontekija_id`, `etunimi`, `sukunimi`) "+
  " VALUES ('1', 'Matti', 'Meikäläinen')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi Matti Meikäläinen lisättiin");
  });

  sql = "INSERT INTO `tyontekijat` (`tyontekija_id`, `etunimi`, `sukunimi`) "+
  " VALUES ('2', 'Maija', 'Meikäläinen')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi Maija Meikäläinen lisättiin");
  });

  sql = "CREATE TABLE asiakkaat (" +
   "asiakas_id integer PRIMARY KEY NOT NULL, " +
   "etunimi text," +
   "sukunimi text," +
   "osoite text," +
   "postinumero text," +
   "postitoimipaikka text)";

   db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Taulu 'asiakkaat' tehtiin");
  })

  sql = "INSERT INTO `asiakkaat` (`etunimi`, `sukunimi`, `osoite`, `postinumero`, `postitoimipaikka`) "+
  " VALUES ('Harri', 'Hammaslääkäri', 'Esimerkkitie 1', '00100' , 'Helsinki')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi Harri Hammaslääkäri lisättiin");
  });

sql = "INSERT INTO `tilaukset` (`tuote`, `tilauspvm`, `toimpvm`, `hinta`, `tyontekija`, 'asiakas', 'lisatieto') "+
  " VALUES ('Purentakisko', '2021-04-01', '2021-04-12', 222.00, 'Matti Meikäläinen', 'Harri Hammaslääkäri', 'Jäljennös oli hankala')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql = "INSERT INTO `tilaukset` (`tuote`, `tilauspvm`, `toimpvm`, `hinta`, `tyontekija`, 'asiakas') "+
  " VALUES ('Valkaisulusikka', '2021-03-15', '2021-03-17', 125, 'Maija Meikäläinen', 'Helena Hammaslääkäri' )";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    } 
    console.log("Rivi lisättiin");
  });

  sql = "INSERT INTO `kayttikset` (`kayttajatunnus`, 'salasana') "+
  " VALUES ('Testi', 'Testi123' )";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    } 
    console.log("Rivi kayttis lisättiin");
  });
})

db.each("SELECT id, tuote FROM tilaukset", (err, row) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(row.id + ", " + row.tuote);

});

db.each("SELECT kayttajatunnus, salasana FROM kayttikset", (err, row) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(row.kayttajatunnus + ", " + row.salasana);

});

db.close();
