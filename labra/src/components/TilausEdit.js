import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';

import axios from 'axios';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';


function TilausEdit() {
    //haetaan parametrit urlista ja asetetaan ne tilamuuttujaan
    let {id, tuote, tilauspaiva, tyontekija, hinta, asiakas, lisatieto} = useParams();
    
    const [tilaus, setValues] = useState ({
        id:id,
        tuote:tuote,
        tilauspvm:tilauspaiva,
        tyontekija:tyontekija,
        toimpvm:null,
        hinta:hinta,
        asiakas:asiakas,
        lisatieto:lisatieto,
    });

    const [viesti, setViesti] = useState('');

    const url= 'http://localhost:8080';

    const [tyontekijat, setTyontekijat] = useState([]);

    //tilauspäivän muutos
    const muutaPaiva = date => {
        const tilpaiva = date.getFullYear()+ '-' + (date.getMonth()+1)+ '-' + date.getDate();
        setValues ({
            ...tilaus,
            tilauspvm:tilpaiva
        });
    };

    //toimituspaivan muutos
    const muutaTPaiva = date => {
        const toimpaiva = date.getFullYear()+ '-' + (date.getMonth()+1)+ '-' + date.getDate()
        setValues ({
            ...tilaus,
            toimpvm:toimpaiva
        });
    };

    //haetaan työntekijät kannasta formia varten
    const haeTyontekijat = async() => {
        try {
            const response = await fetch (url + '/kanta/tyontekijat/all');
            const json = await response.json();
            setTyontekijat(json);
        }catch (error) {
            setTyontekijat([]);
            console.log('Haku ei onnistunut');
        };
    };

    useEffect(() =>{
        haeTyontekijat();
    }, []);

    const muuta = (e) => {
        setValues ({
            ...tilaus,
            [e.target.name]: e.target.value
        });
    };

    //muokatun tilauksen lisääminen kantaan
    const lisaaTilaus = (e) => {

        const formData = {
            'id':tilaus.id,
            'tuote':tilaus.tuote,
            'tilauspvm':tilaus.tilauspvm,
            'toimpvm':tilaus.toimpvm,
            'hinta':tilaus.hinta,
            'tyontekija':tilaus.tyontekija,
            'asiakas':tilaus.asiakas,
            'lisatieto':tilaus.lisatieto,
        }

        axios.post( url + '/kanta/tilaukset/edit/' + tilaus.id, formData)
        .then(response => {
            console.log(tilaus)
            if (response.status === 200){
                setValues({
                    ...tilaus,
                    id:'',
                    tuote:'',
                    tilauspvm:new Date(),
                    tyontekija:'',
                    toimpvm:null,
                    hinta:'',
                    asiakas:'',
                    lisatieto:'',
                })
                setViesti('Muokkaus onnistui, palaa tilauksiin')
            }else{
                setViesti('Muokkaus ei onnistunut')
            }
        })
    };
    
    return(
        <div>
            <Paper elevation={3} style={{width:'500', margin:10}}>
                <form style={{padding:20}}>

                    <TextField 
                        required
                        fullWidth 
                        name='tuote'
                        label='Tuote' 
                        value={tilaus.tuote}
                        onChange = {(e) => muuta(e)}/>

                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale} >
                        <KeyboardDatePicker label='Tilauspäivä' name='tilauspvm'
                            fullWidth={true} 
                            cancelLabel='Peruuta'
                            required
                            value={tilaus.tilauspvm}
                            onChange={muutaPaiva}
                            format='dd.MM.yyyy' />
                    </MuiPickersUtilsProvider>

                    
                    <InputLabel id="tyont">Työntekijä</InputLabel>
                        <Select
                            label='Työntekijä'
                            required
                            fullWidth
                            name='tyontekija'
                            value={tilaus.tyontekija}
                            onChange= {(e) => muuta(e)}
                            labelId='tyont'
                            >
                            {/*Mapataan kannasta haetut työntekijät selectin vaihtoehdoiksi */}
                            {tyontekijat.map(tyontekija => {
                                return(
                                    <MenuItem key={tyontekija.tyontekija_id} value={tyontekija.etunimi + " " + tyontekija.sukunimi }>{tyontekija.etunimi} {tyontekija.sukunimi}</MenuItem>
                                )
                            })}
                        </Select>
                
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
                        <KeyboardDatePicker label='Toimituspäivä' name='toimpva'
                            fullWidth={true} 
                            cancelLabel='Peruuta'                   
                            value={tilaus.toimpvm}
                            onChange={ muutaTPaiva}
                            format='dd.MM.yyyy' />
                    </MuiPickersUtilsProvider>

                    <TextField 
                        required
                        fullWidth
                        name='hinta' 
                        label='Hinta' 
                        value={tilaus.hinta}
                        onChange = {(e) => muuta(e)}/>

                    <TextField 
                        required
                        fullWidth 
                        name='asiakas'
                        label='Asiakas' 
                        defaultValue={tilaus.asiakas}
                        onChange = {(e) => muuta(e)}/>
                    {/*Kokoaan tekstin määrän mukana muuttava tekstilaatikko,
                    käytetään hyväksi textarea autosize kirjastoa npm install react-textarea-autosize --save */}
                    <Typography>Lisätietoa</Typography>
                    <TextareaAutosize
                        name='lisatieto'
                        label='Lisätietoa'
                        value={tilaus.lisatieto}
                        onChange = {(e) => muuta(e)}/>
                </form>
                <Button
                    style={{margin:10}}
                    variant='contained'
                    color='primary'
                    startIcon={<DoneAllIcon/>}
                    onClick={lisaaTilaus}>
                        Tallenna muutokset
                </Button>

                <Typography>{viesti}</Typography>
            </Paper>
        </div>
    );
};

export default TilausEdit;