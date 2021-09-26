import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';

import axios from 'axios';
import { IconButton, Tooltip } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import TextareaAutosize from 'react-textarea-autosize';



function UusiTilaus () {

    const [tuote, setTuote] = useState('');
    const muutaTuote = (e) => {
    setTuote(e.target.value);
    };

    const [tilauspaiva, setTilauspaiva] = useState(null);
    const muutaPaiva = (date) =>{
        const tilpaiva = date.getFullYear()+ '-' + (date.getMonth()+1)+ '-' + date.getDate();
        console.log(tilpaiva);
        setTilauspaiva(tilpaiva);
    };

    const [toimpaiva, setTPaiva] = useState(null);
    const muutaTPaiva = (date) => {
        const toimpaiva = date.getFullYear()+ '-' + (date.getMonth()+1)+ '-' + date.getDate()
        setTPaiva(toimpaiva);
    };

    const [hinta, setHinta] = useState();
    const muutaHinta = (e) => {
    setHinta(e.target.value);
    };    

    const [tyontekija, setTyontekija] = useState('');
    const muutaTyontekija = (e) => {
    setTyontekija(e.target.value);
    };   

    const [asiakas, setAsiakas] = useState({
        
    });
    const muutaAsiakas = (e) =>{
        setAsiakas(e.target.value);
    };

    const [lisatieto, setLisatieto] = useState('');
    const muutaLisatieto = (e) => {
        setLisatieto(e.target.value);
    };

    const [viesti, setViesti] = useState('');

    const [tyontekijat, setTyontekijat] = useState([]);

    const [asiakkaat, setAsiakkaat] = useState([]);

    const url= 'http://localhost:8080'

    //tilauksen lisäys kantaan
    const lisaaTilaus = (e) => {
        e.preventDefault();
        const formData = {
            'tuote' : tuote,
            'tilauspvm': tilauspaiva,
            'toimpvm': toimpaiva,
            'hinta': hinta,
            'tyontekija': tyontekija,
            'asiakas': asiakas,
            'lisatieto':lisatieto,
        }
        axios.post( url + '/kanta/tilaukset/add', formData)
        .then(response => {
            if (response.status === 200){
                setTuote('')
                setTilauspaiva(new Date())
                setTPaiva(null)
                setHinta(0)
                setTyontekija('')
                setAsiakas('')
                setLisatieto('')
                setViesti('Lisäys onnistui')
            }else{
                setViesti('Lisäys ei onnistunut')
            };
        });
    };

    //tyontekijöiden ja asiakkaiden haku formia varten
    const hae = async() => {
        try {
            const response = await fetch (url + '/kanta/tyontekijat/all');
            const json = await response.json();
            setTyontekijat(json);
        }catch (error) {
            setTyontekijat([]);
            console.log('Työntekijöiden haku ei onnistunut');
        }
        try {
            const response = await fetch (url + '/kanta/asiakkaat/all');
            const json = await response.json();
            setAsiakkaat(json);
        }catch (error) {
            setAsiakkaat([]);
            console.log('Asiakkaiden haku ei onnistunut');
        };
    };


    useEffect(() =>{
        hae();
    }, []);
    
    return (
        <div>
            
            <Paper elevation={3} style={{width:500, margin:10}}>
                <form style={{padding:20}}>

                    <TextField 
                        required
                        fullWidth 
                        label='Tuote' 
                        value={tuote}
                        onChange = {(e) => muutaTuote(e)}/>

                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale} >
                        <KeyboardDatePicker 
                            label='Tilauspäivä' 
                            name='tilauspaiva'
                            fullWidth={true} required
                            value={tilauspaiva}
                            onChange={muutaPaiva}
                            format='dd.MM.yyyy' />
                    </MuiPickersUtilsProvider>

                    
                    <InputLabel id="tyont">Työntekijä</InputLabel>
                    <Select
                        label='Työntekijä'
                        required
                        fullWidth
                        value={tyontekija}
                        onChange= {(e) => muutaTyontekija(e)}
                        labelId='tyont'
                    >{/*Mapataan kannasta haetut työntekijät selectiin */}
                        {tyontekijat.map(tyontekija => {
                            return(
                                <MenuItem key= {tyontekija.tyontekija_id} value={tyontekija.etunimi + ' ' + tyontekija.sukunimi }>{tyontekija.etunimi} {tyontekija.sukunimi}</MenuItem>
                            )
                        })}
                        
                    </Select>
                    

                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
                        <KeyboardDatePicker 
                        label='Toimituspäivä' 
                        name='toimpaiva'
                        fullWidth={true}                    
                        value={toimpaiva}
                        onChange={ muutaTPaiva}
                        format='dd.MM.yyyy' />
                    </MuiPickersUtilsProvider>

                    <TextField 
                        required
                        fullWidth 
                        label='Hinta' 
                        value={hinta}
                        onChange = {(e) => muutaHinta(e)}/>


                    <InputLabel id="asiakas">Asiakas</InputLabel>
                    <Select
                        label='Asiakas'
                        required
                        fullWidth
                        value={asiakas}
                        onChange= {(e) => muutaAsiakas(e)}
                        labelId='asiakas'
                    >{/*Mapataan kannasta haetut asiakkaat selectiin */}
                        {asiakkaat.map(asiakas => {
                            return(
                                <MenuItem key= {asiakas.asiakas_id} value={asiakas.etunimi + ' ' + asiakas.sukunimi }>{asiakas.etunimi} {asiakas.sukunimi}</MenuItem>
                            )
                        })}
                        
                    </Select>
                    {/*Kokoaan tekstin määrän mukana muuttava tekstilaatikko,
                    käytetään hyväksi textarea autosize kirjastoa npm install react-textarea-autosize --save */}
                    <Typography>Lisätietoa</Typography>
                    <TextareaAutosize
                    style={{marginTop:10}}
                    name='lisatieto'
                    label='Lisätietoa'
                    value={lisatieto}
                    onChange = {(e) => muutaLisatieto(e)}/>

                </form>
                <Tooltip title='Lisää tilaus'>
                    <IconButton
                        onClick={lisaaTilaus}>
                        <NoteAddIcon/>
                    </IconButton>
                </Tooltip>
                <Typography>{viesti}</Typography>
            </Paper>
        </div>
    )
};
export default UusiTilaus;