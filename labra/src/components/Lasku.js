import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router';


import moment from "moment";


function Lasku (props) {
    //propsina saadaan tilauksen id sekä asiakkaan nimi
    let {id, asiakas} = useParams();
    const url= 'http://localhost:8080'

    const [asiakas1, setAsiakas] = useState([]);
    const [tilaus, setTilaus] = useState([]);

    const [erapaiva, setErapaiva] = useState('');

    //haetaan asiakkaan sekä tilauksen täydet tiedot kannasta
    const hae = async() => {
        const str = (asiakas);

        //propsina saadun nimen käsittely kantaan sopivaksi
        const nimi = str.split(' ');
        let etunimi= nimi[0];
        let sukunimi= nimi[1];
        console.log(etunimi, sukunimi);


        try {
            const response = await fetch (url + '/kanta/asiakkaat/one/' + etunimi + '/' + sukunimi);
            const json = await response.json();
            setAsiakas(json);
            console.log('Asiakkaan haku onnistui')
            
            }catch (error) {
            setAsiakas([]);
            console.log('Asiakkaan haku ei onnistunut');
            }
        try {
            const response = await fetch (url + '/kanta/tilaukset/one/' + id);
            const json = await response.json();
            setTilaus(json);
            //toimituspäivämäärään lisätään 14 vrk, jotta saadaan eräpäivä.
            //käytetaan moment-kirjastoa apuna muotoilussa npm install moment --save
            let eris = new Date(json.toimpvm);
            eris.setDate(eris.getDate() + 14);
            eris = moment(eris).format('YYYY-MM-DD')
            setErapaiva(eris)
            console.log('Tilauksen haku onnistui')
        }catch (error) {
            setTilaus([]);
            console.log('Tilauksen haku ei onnistunut');
        };
    };

    useEffect(() =>{
        hae();
    }, []);

    return(
        <div>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography align='center' variant='h4'>Lasku</Typography>
                    <br/>
                </Grid>
                <Grid item xs={6}>
                    <Typography align='left'>{asiakas1.etunimi} {asiakas1.sukunimi}</Typography>
                    <Typography align='left'>{asiakas1.osoite}</Typography>
                    <Typography align='left'>{asiakas1.postinumero} {asiakas1.postitoimipaikka}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Päivämäärä &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   {tilaus.toimpvm } </Typography>
                    <Typography>Y-tunnus     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   1234567-8</Typography>
                    <Typography>Viivästyskorko &nbsp;&nbsp; 7,0%</Typography>
                    
                </Grid>
                <Grid item xs={12}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {/*Olisi voinut käyttää myös divider-komponenttia, mutta se ei näy tulosteessa */}
                    <hr/>
                    <Typography align='left'>Tuote: {tilaus.tuote}</Typography>
                    <Typography align='left'>Hinta: {tilaus.hinta}€</Typography>
                    <Typography align='left'>Tekijä: {tilaus.tyontekija}</Typography>
                    <Typography align='left'>Lisätietoja: {tilaus.lisatieto}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <hr/>
                    <Typography>Tilinumero: FI00 1234 1234 1234</Typography>
                    <Typography>Viitenumero:123 123 123</Typography>
                    <Typography>Euro: {tilaus.hinta}</Typography>
                    <Typography>Maksuehto: 14pv </Typography>
                    <Typography>Eräpäivä: {erapaiva}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}
export default Lasku;