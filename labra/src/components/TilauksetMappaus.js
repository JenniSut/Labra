import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';

import { Link } from 'react-router-dom';
import { CardActions, Tooltip } from '@material-ui/core';


//propsina tulee tilaukset-taulukko
function TilauksetMappaus (props) {
const tilaukset=props.tilaukset;
//console.log(tilaukset);
return (
    <Grid container spacing = {4}>
            {tilaukset.map(tilaus => {
                return (
                    <Grid item key={tilaus.id}>
                        <Card style={{minWidth: 250, minHeight: 400, maxWidth: 350}}>
                            <CardHeader
                                title={tilaus.tuote}
                                subheader= {tilaus.asiakas}/>
                            <CardContent>
                                <Typography>Tilauspäivämäärä: {tilaus.tilauspvm}</Typography>

                                {/*Jos ei ole annettu toimituspvmää tilausta ei ole vielä toimitettu*/}

                                {tilaus.toimpvm ? 
                                    <Typography>Toimituspäivämäärä: {tilaus.toimpvm}</Typography>
                                    : 
                                    <Typography>Ei vielä toimitettu</Typography>
                                }
                                <Typography>Hinta: {tilaus.hinta}€</Typography>
                                <Typography>Työntekijä: {tilaus.tyontekija}</Typography>
                                
                                {tilaus.lisatieto ? 
                                    <Typography>Lisätietoa: {tilaus.lisatieto}</Typography>
                                    : 
                                    <Typography></Typography>
                                }
                                <CardActions>

                                    {/*Jos tilausta ei ole vielä toimitettu, sitä voi muokata*/}

                                    {tilaus.toimpvm ? 
                                        <div>
                                            <Typography>Et voi enää muokata tilausta</Typography>
                                            {/*Laskun tulostukseen */}
                                            <Tooltip title='Tulosta lasku'>
                                                <IconButton component= {Link} to ={'/lasku/' + tilaus.id + '/' + tilaus.asiakas}><PrintIcon /></IconButton>
                                            </Tooltip>
                                        </div>
                                        : 
                                        <Tooltip title='Muokkaa tilausta'>
                                            <IconButton component={ Link } to={ '/muokkaatilausta/' + tilaus.id + '/' + tilaus.tuote + '/' + tilaus.tilauspvm + '/' + tilaus.tyontekija + '/' + tilaus.toimpvm + '/' + tilaus.hinta + '/' + tilaus.asiakas + '/' + tilaus.lisatieto}><EditIcon /></IconButton>
                                        </Tooltip>
                                    }
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })};
    </Grid>
    );

};
export default TilauksetMappaus;