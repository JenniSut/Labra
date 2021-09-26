import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { Link } from 'react-router-dom';

//propsina saadaa työntekijät-taulukko
function TyontekijatMappaus (props) {
    const tyontekijat=props.tyontekijat;

    return (
        <div>
            <Button 
                style={{margin:10}}
                variant='contained' 
                startIcon={<AddCircleIcon />} 
                color='secondary'
                component= {Link} to='/uusiTyontekija'
                >Lisää uusi työntekijä
            </Button>
            <Grid container spacing = {4} style={{margin:10}}>
                {tyontekijat.map(tyontekija => {
                    return (
                        <Grid item key={tyontekija.tyontekija_id}>
                            <Card style={{minWidth: 100, minHeight: 100}}>
                                <CardContent>
                                    <PersonIcon/>
                                    <Typography>Työntekijä: {tyontekija.etunimi+ ' ' +tyontekija.sukunimi}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })};
            </Grid>
        </div>
    );

};
export default TyontekijatMappaus;