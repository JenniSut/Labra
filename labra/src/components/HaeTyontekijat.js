import { Typography } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import TyontekijatMappaus from './TyontekijatMappaus';

function HaeTyontekijat(props) {
    const [tyontekijat, setTyontekijat] = useState([]);
    const [virhe, setVirhe] = useState('Haetaan');

    const url = 'http://localhost:8080';

    //haetaan kaikki tyontekijät kannasta
    const haeKaikkiTyontekijat = async() => {
        try {
            const response = await fetch (url + '/kanta/tyontekijat/all');
            const json = await response.json();
            setTyontekijat(json);
            setVirhe('');
        }catch (error) {
            setTyontekijat([]);
            setVirhe('Haku ei onnistunut');
        }
    };

    useEffect(() =>{
        haeKaikkiTyontekijat();
    }, []);

        if (virhe.length > 0){
            return (
        <Typography>{virhe}</Typography> 
            )
        }
        if (tyontekijat.length > 0) {
            return (
                <TyontekijatMappaus tyontekijat={ tyontekijat }/>
            )
        }
        <Typography>Yhtään tyontekijää ei löytynyt</Typography>
    
};

export default HaeTyontekijat;