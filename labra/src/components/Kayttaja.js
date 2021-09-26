import {InputLabel, Paper, OutlinedInput, Button, Tooltip, } from '@material-ui/core';
import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import axios from 'axios';

function Kayttaja(props){
    
    //kayttajatunnus saadaan propsina
    const [tunnus, setTunnus] = useState({
        kayttajatunnus:(props.kayttis),
        salasana:''
    });
    const [virhe, setVirhe] = useState('')

    //lomakkeelta saatava vanha salasana
    const muutaSalasana = (e) =>{
        setTunnus({
            ...tunnus, salasana:e.target.value,
        })
    };

    //lomakkeelta saatava uusi salasana
    const [uusiSalasana, setUusi] = useState('');
    const muutaUusiSalasana = (e) => {
        setUusi(e.target.value);
    };

    //lomakkeelta saatava "salasana uudestaan", johon verrataan uutta salasanaa
    const [vertailuSalasana, setVertailu] = useState('');
    const muutaVertailu = (e) => {
        setVertailu(e.target.value);
    }
    const url= 'http://localhost:8080';


    const muokkaa = async(e) => {
            try {
                const response = await fetch('http://localhost:8080/kanta/kayttikset/one/' + tunnus.kayttajatunnus);
                const json = await response.json();
                console.log(json);
                //verrataan annettua vanhaa salasanaa kantaan tallennettuun
                if (tunnus.salasana === json.salasana){
                    //verrataan uusia annettuja salasanoja kirjoitusvirheiden varalta
                    if (uusiSalasana === vertailuSalasana){
                        const formData = {
                            'salasana':uusiSalasana,
                        }
                
                        axios.post( url + '/kanta/kayttikset/edit/' + tunnus.kayttajatunnus, formData)
                        .then(response => {
                            console.log(uusiSalasana)
                            if (response.status === 200){
                                setUusi('');
                                setVertailu('');
                                setTunnus({...tunnus, salasana:''});
                                setVirhe('Salasana vaihdettu')
                            }else{
                                setVirhe('Salasanan vaihto ei onnistunut')
                            }
                        })
                    }else {
                        setVirhe('Salasanat eivät täsmää')
                    };
                }else {
                    setVirhe('Väärä salasana')}
             }catch(error){
                setVirhe('Kävi odottamaton virhe')
            };
        };
    

    return(
        <div>
            <Paper elevation={3} style={{width:400, margin:10}}>
                <form style ={{margin:10, padding:10}}>
                    <FormControl disabled style ={{margin:10}}>
                        <InputLabel>Käyttäjätunnus</InputLabel>
                        <OutlinedInput value={tunnus.kayttajatunnus} />
                    </FormControl>
                    <br/>
                    <FormControl style ={{margin:10}}>
                        <InputLabel>Vanha salasana</InputLabel>
                        <OutlinedInput type='password' value={tunnus.salasana} onChange= {(e) => muutaSalasana(e)}/>
                    </FormControl>
                    <br/>
                    <FormControl style ={{margin:10}}>
                        <InputLabel>Uusi salasana</InputLabel>
                        <OutlinedInput type='password' value={uusiSalasana} onChange= {(e) => muutaUusiSalasana(e)}/>
                    </FormControl>
                    <br/>
                    <FormControl style ={{margin:10}}>
                        <InputLabel>Uusi salasana uudestaan</InputLabel>
                        <OutlinedInput type='password' value={vertailuSalasana} onChange= {(e) => muutaVertailu(e)}/>
                    </FormControl>
                    <br/>
                    <Tooltip title='Vaihda salasana'>
                        <Button variant='contained' color='primary' startIcon={<DoneAllIcon/>} onClick= {muokkaa}></Button>
                    </Tooltip>
                </form>
                {virhe}
            </Paper>
        </div>
    );
};

export default Kayttaja;