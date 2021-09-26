import { Typography } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import AsiakkaatMappaus from './AsiakkaatMappaus';

function HaeAsiakkaat() {
    const [asiakkaat, setAsiakkaat] = useState([]);
    const [virhe, setVirhe] = useState('Haetaan');

    const url = 'http://localhost:8080';

    //kaikkien asiakkaiden haku kannasta
    const haeKaikkiAsiakkaat = async() => {
        try {
            const response = await fetch (url + '/kanta/asiakkaat/all');
            const json = await response.json();
            setAsiakkaat(json);
            setVirhe('');
        }catch (error) {
            setAsiakkaat([]);
            setVirhe('Haku ei onnistunut');
        }
    };

    useEffect(() =>{
        haeKaikkiAsiakkaat();
    }, []);

        if (virhe.length > 0){
            return (
        <Typography>{virhe}</Typography> 
            )
        }
        if (asiakkaat.length > 0) {
            return (
                <AsiakkaatMappaus asiakkaat={ asiakkaat }/>
            )
        }
        <Typography>Yhtään asiakasta ei löytynyt</Typography>
    
};

export default HaeAsiakkaat;