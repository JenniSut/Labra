import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import axios from 'axios';

function UusiTyontekija() {

    const [tyontekija, setValues] = useState({
        etunimi:'',
        sukunimi:''
    });

    const [viesti, setViesti] = useState('');

    const muuta = (e) => {
        setValues ({
            ...tyontekija,
            [e.target.name]: e.target.value
        });
    };
    
    const url= 'http://localhost:8080'

    //Uuden työntekijän lisäys kantaan
    const lisaaTyontekija = (e) => {
        e.preventDefault();
        const formData = {
            'etunimi':tyontekija.etunimi,
            'sukunimi':tyontekija.sukunimi
        };
        axios.post( url + '/kanta/tyontekijat/add', formData)
        .then(response => {
            if (response.status === 200){
                setValues({
                    ...tyontekija, etunimi:'', sukunimi:''
                });
                setViesti('Lisäys onnistui');
            }else{
                setViesti('Lisäys ei onnistunut');
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
                        value={tyontekija.etunimi}
                        onChange = {(e) => muuta(e)}/>
                    
                    <TextField 
                        required
                        fullWidth 
                        name='sukunimi'
                        label='Sukunimi' 
                        value={tyontekija.sukunimi}
                        onChange = {(e) => muuta(e)}/>
                </form>
                
                <Button 
                    style={{marginLeft:'25%', marginBottom:10}}
                    variant='contained' 
                    startIcon={<NoteAddIcon />} 
                    color='secondary'
                    onClick={lisaaTyontekija}>
                        Lisää
                </Button>
                
                <Typography> {viesti}</Typography>
            </Paper>
        </div>
    );
};

export default UusiTyontekija;