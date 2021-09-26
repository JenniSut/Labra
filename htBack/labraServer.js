const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
express.urlencoded({limit: '5mb', extended: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('kanta.db');

const helmet = require('helmet');
app.use(helmet());


// back kuuntelee porttia 8080
app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
});

// Reititys on pelkkä / esim. localhost:8080/
app.get('/', (req, res, next) => {
    return res.status(200).json({ error: false, message: 'Toimii' })
});

 
app.get('/kanta/tilaukset/all', (req, res, next) => {
	db.all("SELECT * FROM tilaukset", (error, results) => {
    if (error) throw error;

    return res.status(200).json(results);
  });
});

app.get('/kanta/tyontekijat/all', (req, res, next) => {
	db.all("SELECT * FROM tyontekijat", (error, results) => {
    if (error) throw error;

    return res.status(200).json(results);
  });
});

app.get('/kanta/asiakkaat/all', (req, res, next) => {
	db.all("SELECT * FROM asiakkaat", (error, results) => {
    if (error) throw error;

    return res.status(200).json(results);
  });
});

//haku tilauksista id:llä
app.get('/kanta/tilaukset/one/:id', (req, res, next) => {
    let id = req.params.id;
    db.get('SELECT * FROM tilaukset where id=?', [id], (error, result) => {
        if (error) throw error;

        if (typeof(result) == 'undefined')  {
          return res.status(200).send({});
        }

        return res.status(200).json(result);
    });
});

//salasanan haku kayttajatunnuksella
app.get('/kanta/kayttikset/one/:id', (req, res, next) => {
    let id = req.params.id;
    db.get('SELECT * FROM kayttikset where kayttajatunnus=?', [id], (error, result) => {
        if (error) throw error;

        if (typeof(result) == 'undefined')  {
          return res.status(200).send({});
        }

        return res.status(200).json(result);
    });
});

//asiakkaan haku nimellä
app.get('/kanta/asiakkaat/one/:etunimi/:sukunimi', (req, res, next) => {
  let etunimi = req.params.etunimi;
  let sukunimi = req.params.sukunimi
  db.get('SELECT * FROM asiakkaat where etunimi=? AND sukunimi=?', [etunimi, sukunimi], (error, result) => {
      if (error) throw error;

      if (typeof(result) == 'undefined')  {
        return res.status(200).send({});
      }

      return res.status(200).json(result);
  });
});

//tilauksen poisto (ei käytössä)
app.get('/kanta/tilaukset/delete/:id', (req, res, next) => {
    let id = req.params.id;

    db.run('DELETE FROM tilaukset WHERE id = ?', [id],  function (error, result) {
        if (error) throw error;

        return res.status(200).json( {count: this.changes} );
    });

});

//tilauksen lisäys
app.post('/kanta/tilaukset/add', (req, res, next) => {
    let tilaus = req.body;
    
    db.run('INSERT INTO tilaukset (tuote, tilauspvm, toimpvm, hinta, tyontekija, asiakas, lisatieto) values (?, ?, ?, ?, ?, ?, ?)',
            [tilaus.tuote, tilaus.tilauspvm, tilaus.toimpvm, tilaus.hinta, tilaus.tyontekija, tilaus.asiakas, tilaus.lisatieto], (error, result) => {
          if (error) throw error;
  
          return res.status(200).json( {count: 1} );
      });
  })

  app.post('/kanta/kayttikset/add', (req, res, next) => {
    let tunnus = req.body;
    
    db.run('INSERT INTO kayttikset (kayttajatunnus, salasana) values (?, ?)',
            [tunnus.kayttajatunnus, tunnus.salasana], (error, result) => {
          if (error) throw error;
  
          return res.status(200).json( {count: 1} );
      });
  })

  app.post('/kanta/tyontekijat/add', (req, res, next) => {
    let tyontekija = req.body;
    
    db.run('INSERT INTO tyontekijat (etunimi, sukunimi) values (?, ?)',
            [tyontekija.etunimi, tyontekija.sukunimi], (error, result) => {
          if (error) throw error;
  
          return res.status(200).json( {count: 1} );
      });
  })

  app.post('/kanta/asiakkaat/add', (req, res, next) => {
    let asiakas = req.body;
    
    db.run('INSERT INTO asiakkaat (etunimi, sukunimi, osoite, postinumero, postitoimipaikka) values (?, ?, ?, ?, ?)',
            [asiakas.etunimi, asiakas.sukunimi, asiakas.osoite, asiakas.postinumero, asiakas.postitoimipaikka], (error, result) => {
          if (error) throw error;
  
          return res.status(200).json( {count: 1} );
      });
  })


  //asiakkaan muokkaus asiakas_id:llä
  app.post('/kanta/asiakkaat/edit/:asiakas_id', (req, res, next) => {
    let id = req.params.id;
    let asiakas = req.body;
   
	db.run('UPDATE asiakkaat SET etunimi=?, sukunimi=?, osoite=?, postinumero=?, postitoimipaikka=? WHERE asiakas_id=?',
			[asiakas.etunimi, asiakas.sukunimi, asiakas.osoite, asiakas.postinumero, asiakas.postitoimipaikka, id], (error, result) => {
		  if (error) throw error;
  
		  return res.status(200).json( {count: this.changes} );
	});
  })

  app.post('/kanta/tilaukset/edit/:id', (req, res, next) => {
    let id = req.params.id;
    let tilaus = req.body;
   
	db.run('UPDATE tilaukset SET tuote=?, tilauspvm=?, toimpvm=?, hinta=?, tyontekija=?, asiakas=?, lisatieto=? WHERE id=?',
			[tilaus.tuote, tilaus.tilauspvm, tilaus.toimpvm, tilaus.hinta, tilaus.tyontekija, tilaus.asiakas, tilaus.lisatieto, id], (error, result) => {
		  if (error) throw error;
  
		  return res.status(200).json( {count: this.changes} );
	});
  })

  app.post('/kanta/kayttikset/edit/:kayttajatunnus', (req, res, next) => {
    let kayttajatunnus = req.params.kayttajatunnus;
    let salasana = req.body;
   
	db.run('UPDATE kayttikset SET salasana=? WHERE kayttajatunnus=?',
			[salasana.salasana, kayttajatunnus], (error, result) => {
		  if (error) throw error;
  
		  return res.status(200).json( {count: this.changes} );
	});
  })

// Jos mikään aiempi reititys on sopinut, silloin suoritetaan tämä
app.get('*', (req, res, next) => {
    return res.status(404).send({ error: true, message: 'Ei pyydettyä palvelua' })
});