import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';

import { Link } from 'react-router-dom';
import { CardActions, CardHeader, IconButton, Tooltip } from '@material-ui/core';

//asiakkaat-taulukko tulee propsina
function AsiakkaatMappaus (props) {
    const asiakkaat=(props.asiakkaat);

    return (
        <div>
            {/*Nappi uuden asiakkaan lisäykseen */}
            <Button 
                style={{margin:10}}
                variant='contained' 
                startIcon={<AddCircleIcon />} 
                color='secondary'
                component= {Link} to='/uusiAsiakas'
            >Lisää uusi asiakas</Button>

            {/*Asiakkaat-taulukon mappaus */}
            <Grid container spacing = {4} style={{margin:10}}>
                    {asiakkaat.map(asiakas => {
                        return (
                            <Grid item key={asiakas.asiakas_id}>
                                <Card style={{minWidth: 100, minHeight: 100}}>
                                    <CardHeader
                                        title={asiakas.etunimi + ' ' + asiakas.sukunimi}
                                    />
                                    <CardContent>
                                        <EmojiPeopleIcon/>
                                        <Typography>Osoite: {asiakas.osoite} <br/> {asiakas.postinumero + ' ' + asiakas.postitoimipaikka}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Tooltip title='Muokkaa'>
                                            <IconButton component={ Link } to={ '/muokkaaAsiakasta/' + asiakas.asiakas_id + '/' + asiakas.etunimi + '/' + asiakas.sukunimi + '/' + asiakas.osoite + '/' + asiakas.postinumero + '/' + asiakas.postitoimipaikka }><EditIcon /></IconButton>
                                        </Tooltip>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )})}
                </Grid>
            </div>
        );

}
export default AsiakkaatMappaus;