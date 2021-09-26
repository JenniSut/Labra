import { Typography } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import TilauksetMappaus from './TilauksetMappaus';

function HaeTilaukset() {
    const [tilaukset, setTilaukset] = useState([]);
    const [virhe, setVirhe] = useState('Haetaan');

    const url = 'http://localhost:8080';

    //haetaan kaikki tilaukset kannasta
    const haeKaikkiTilaukset = async() => {
        try {
            const response = await fetch (url + '/kanta/tilaukset/all');
            const json = await response.json();
            setTilaukset(json);
            setVirhe('');
        }catch (error) {
            setTilaukset([]);
            setVirhe('Haku ei onnistunut');
        }
    };

    useEffect(() =>{
        haeKaikkiTilaukset();
    }, []);

        if (virhe.length > 0){
            return (
        <Typography>{virhe}</Typography> 
            )
        }
        if (tilaukset.length > 0) {
            return (
                <TilauksetMappaus tilaukset={ tilaukset }/>
            )
        }
        <Typography>Yhtään tilausta ei löytynyt</Typography>
};

export default HaeTilaukset;