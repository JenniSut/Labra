import { Grid, Typography } from '@material-ui/core';
import React from 'react';

function Kirjaudu() {
    return(
    <div>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <Typography variant='h5'>Ole hyvä ja kirjaudu sisään!</Typography>
                </Grid>
        </Grid>
        
    </div>
    );
};
export default Kirjaudu;