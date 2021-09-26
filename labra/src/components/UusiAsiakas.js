import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import axios from 'axios';

function UusiAsiakas() {

    const [asiakas, setValues] = useState({
        etunimi:'',
        sukunimi:'',
        osoite:'',
        postinumero:'',
        postitoimipaikka:'',
    });

    const [viesti, setViesti] = useState('');

    const muuta = (e) => {
        setValues ({
            ...asiakas,
            [e.target.name]: e.target.value
        });
    };
    
    const url= 'http://localhost:8080'

    //Uuden asiakkaan lisäys kantaan
    const lisaaAsiakas = (e) => {
        e.preventDefault();
        const formData = {
            'etunimi':asiakas.etunimi,
            'sukunimi':asiakas.sukunimi,
            'osoite':asiakas.osoite,
            'postinumero':asiakas.postinumero,
            'postitoimipaikka':asiakas.postitoimipaikka,
        };
        axios.post( url + '/kanta/asiakkaat/add', formData)
        .then(response => {
            if (response.status === 200){
                setValues({
                    ...asiakas, etunimi:'', sukunimi:'', osoite:'', postinumero:'', postitoimipaikka:''
                })
                setViesti('Lisäys onnistui')
            }else{
                setViesti('Lisäys ei onnistunut')
            }
        });
    };

    return (
        <div>
            <Paper style={{width:250, margin:10}}>
                <form style={{padding:20}}>
                    <TextField 
                        required
                        fullWidth 
                        label='Etunimi' 
                        name='etunimi'
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
                    style={{marginLeft:'25%', marginBottom:10}}
                    variant='contained' 
                    startIcon={<NoteAddIcon />} 
                    color='secondary'
                    onClick={lisaaAsiakas}>
                        Lisää
                </Button>
                <Typography> {viesti}</Typography>
            </Paper>
        </div>
    );
};

export default UusiAsiakas;