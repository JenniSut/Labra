import { Button, Paper, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import DoneAllIcon from '@material-ui/icons/DoneAll';

function EditAsiakas() {
    //haetaan tarvittavat paremetrit urlista
    let {asiakas_id, etunimi, sukunimi, osoite, postinumero, postitoimipaikka} = useParams();

    const [asiakas, setValues] = useState ({
        asiakas_id:asiakas_id,
        etunimi:etunimi,
        sukunimi:sukunimi,
        osoite:osoite,
        postinumero:postinumero,
        postitoimipaikka:postitoimipaikka,
    });

    const [viesti, setViesti] = useState('');

    const url= 'http://localhost:8080';

    //käytetään samaa funtiota kaikille tapahtumille
    const muuta = (e) => {
        setValues ({
            ...asiakas,
            [e.target.name]: e.target.value
        });
    };

    //asiakkaasn lisäys kantaan
    const lisaaAsiakas = (e) => {

        const formData = {
            'asiakas_id':asiakas.asiakas_id,
            'etunimi':asiakas.etunimi,
            'sukunimi':asiakas.sukunimi,
            'osoite':asiakas.osoite,
            'postinumero':asiakas.postinumero,
            'postitoimipaikka':asiakas.postitoimipaikka,
        };

        axios.post( url + '/kanta/asiakkaat/edit/' + asiakas.asiakas_id, formData)
        .then(response => {
            console.log(asiakas)
            if (response.status === 200){
                setValues({
                    ...asiakas,
                    asiakas_id:'',
                    etunimi:'',
                    sukunimi:'',
                    osoite:'',
                    postinumero:'',
                    postitoimipaikka:'',
                });
                setViesti('Muokkaus onnistui')
            }else{
                setViesti('Muokkaus ei onnistunut')
            }
        })
    };

return(
    <div>
        <Paper elevation={3} style={{width:'50%', margin:10}}>
            <form style={{padding:20}}>

                <TextField 
                    required
                    fullWidth 
                    name='etunimi'
                    label='Etunimi' 
                    value={asiakas.etunimi}
                    onChange = {(e) => muuta(e)}/>
                    
                <TextField 
                    required
                    fullWidth
                    name='sukunimi' 
                    label='Sukunimi' 
                    value={asiakas.sukunimi}
                    onChange = {(e) => muuta(e)}/>

                <TextField 
                    required
                    fullWidth 
                    name='osoite'
                    label='Osoite' 
                    value={asiakas.osoite}
                    onChange = {(e) => muuta(e)}/>

                <TextField 
                    required
                    fullWidth 
                    name='postinumero'
                    label='Postinumero' 
                    value={asiakas.postinumero}
                    onChange = {(e) => muuta(e)}/>

                <TextField 
                    required
                    fullWidth 
                    name='postitoimipaikka'
                    label='Postitoimipaikka' 
                    value={asiakas.postitoimipaikka}
                    onChange = {(e) => muuta(e)}/>

            </form>
            <Button
                style={{margin:10}}
                variant='contained'
                color='primary'
                startIcon={<DoneAllIcon />}
                onClick={lisaaAsiakas}>
                    Tallenna muutokset
            </Button>

            <Typography >{viesti}</Typography>
        </Paper>
    </div>
);

};

export default EditAsiakas;