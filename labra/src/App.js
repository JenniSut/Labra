import {React, useState} from 'react';
import UusiTilaus from './components/UusiTilaus';
import HaeTilaukset from './components/HaeTilaukset';
import HaeTyontekijat from './components/HaeTyontekijat';
import TilausEdit from './components/TilausEdit';
import Kirjaudu from './components/Kirjaudu';
import UusiTyontekija from './components/UusiTyontekija';
import HaeAsiakkaat from './components/HaeAsiakkaat';
import UusiAsiakas from './components/UusiAsiakas';
import EditAsiakas from './components/EditAsiakas';
import Kayttaja from './components/Kayttaja';
import Lasku from './components/Lasku';

import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {blue, deepPurple } from '@material-ui/core/colors/';
import FaceIcon from '@material-ui/icons/Face';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, FormControl, IconButton, OutlinedInput, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import DoneIcon from '@material-ui/icons/Done';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';


import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleIcon from '@material-ui/icons/People';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';

import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom';



const tyyli = makeStyles ({
  otsikko: {
    height: 70,
    backgroundColor: deepPurple.A100,
    flexGrow:1,
    textAlign:'center',
    fontStyle:"italic",
  }
})
const teema = createMuiTheme ({
  palette: {
    primary: {main: deepPurple.A100, contrastText: '#FFFFFF'},
    secondary: {main: deepPurple[800]},
    text: {primary: deepPurple[700], secondary: blue[800]},
    background: {
      default: deepPurple[50],
    } 
  },
  typography: {
    fontFamily: ['Kiwi Maru', 'serif'],
  },
  overrides:{
    MuiCard: {
      root: {
        padding:20,
        margin: 10, 
        borderRadius: 10,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      }
   },
   MuiButton: {
      root:{
        marginTop: 10,
      }
   },
   MuiTextField: {
     root:{
       marginTop: 10,
     }
   }
   
  },
  
  
});

function App() {
  const classes = tyyli();

  //kirjautumisdialogin avaamiseen ja sulkemiseen tarvittavat tapahtuman käsittelijät
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //kirjautumiseen tarvittavat muuttujat
  const [kayttajatunnus, setKayttis] = useState ('');
  const muutaKayttis = (e) => {
    setKayttis(e.target.value)
  }

  const [kayttis, setKayttaja] = useState('');

  //salasanan näkyminen ja sen tapahtumankäsittelijät
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //kirjautunut vai ei
  const [kirjautunut, setKirjautunut] = useState(false);
  const muutaKirjautunut = () =>{
    setKirjautunut(true);
  } 

  const [virhe, setVirhe] = useState('');
  

  //uloskirjautuminen
  const ulos = () => {
    setKirjautunut(false)
    setValues({
      ...values,
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    })
    setVirhe('')
  };

  //menun avaamiseen ja sulkemiseen liittyvät tapahtumankäsittelijät
  const [menuOpen, setMenuOpen ] = useState(false);
  
    const handleMenuOpen = () => { 
      setMenuOpen(true); 
    }
  
    const handleMenuClose = () => { 
      setMenuOpen(false); 
    }

  
  

  //salasanan ja käyttäjätunnuksen tarkistus
  const tarkista = async() => {
      try {
        const response = await fetch('http://localhost:8080/kanta/kayttikset/one/' + kayttajatunnus);
        const json = await response.json();
        console.log(json);
          if (json.salasana === values.password) {
          muutaKirjautunut(true);
          setKayttaja(kayttajatunnus)
          setVirhe('Kirjautuminen onnistui')
          setKayttis('')
          //setValues({...values, Password:''})
          handleClose()
          }else {
          setVirhe('Väärä käyttäjätunnus tai salasana')
          };
      }catch (error) {
        setVirhe('Yritä uudelleen')
      };
  };  
  
  //jos ei olla kirjauduttu (kirjautunut = false)
  if (kirjautunut === false){
    return (
      <BrowserRouter>
      <MuiThemeProvider theme={ teema }>
      <CssBaseline />
        <div>
          <Grid>
            <AppBar position='static'>
              <Toolbar>
                {/*Menu */}
                <Tooltip title='Menu'>
                  <IconButton onClick={ handleMenuOpen } color='inherit' align='right'><MenuIcon /></IconButton>
                </Tooltip>
                {/*Nimi */}
                <Typography className= {classes.otsikko} variant='h4' component='h1'>Labra</Typography>
                {/*Kirjautuminen */}
                <Tooltip title='Kirjaudu sisään'>
                  <IconButton color='inherit' onClick={handleClickOpen} align='left'>
                    <FaceIcon/>
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
            {/*Dialogi kirjautumista varten */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Kirjaudu sisään</DialogTitle>
                <DialogContent>
                  <form>
                    <TextField 
                      fullWidth
                      label='käyttäjätunnus'
                      variant='outlined'
                      value={kayttajatunnus}
                        onChange={muutaKayttis}/>
                    <InputLabel>Salasana</InputLabel>
                    <FormControl >
                      <OutlinedInput
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.Password}
                        onChange={handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <Tooltip title='Näytä salasana'>
                              <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        } 
                      />
                    </FormControl>
                  </form>
                  <br/>  
                </DialogContent>
                <DialogActions>
                  <Tooltip title='Kirjaudu'>
                    <IconButton
                      onClick={tarkista}
                      align='center'>
                        <DoneIcon/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Poistu'>
                    <IconButton onClick={handleClose}>
                      <ExitToAppIcon/>
                    </IconButton>
                  </Tooltip>
                  {virhe}
                </DialogActions>
            </Dialog>

            {/*sivupalkki "drawer" menu */}
            <Drawer anchor='left' open={ menuOpen } onClick={ handleMenuClose }>
              <List>
                <ListItem button component= {Link} to='/'>
                  <ListItemIcon><AddCircleIcon color='primary'/></ListItemIcon>
                  <ListItemText primary='UUSI TILAUS' />
                </ListItem>
                <ListItem button component= {Link} to='/'>
                  <ListItemIcon><FolderSpecialIcon color='primary'/></ListItemIcon>
                  <ListItemText primary='TILAUKSET'  />
                </ListItem>
                <ListItem button component= {Link} to='/'>
                  <ListItemIcon><AssignmentIndIcon color='primary'/></ListItemIcon>
                  <ListItemText primary='TYÖNTEKIJÄT' />
                </ListItem>
                <ListItem button component= {Link} to='/'>
                  <ListItemIcon><PeopleIcon color='primary'/></ListItemIcon>
                  <ListItemText primary='ASIAKKAAT' />
                </ListItem>
                <ListItem button component= {Link} to='/'>
                  <ListItemIcon><FaceIcon color='primary'/></ListItemIcon>
                  <ListItemText primary='KÄYTTÄJÄ' />
                </ListItem>
              </List>
            </Drawer>
            {/*routtaukset, koska ei olla kirjauduttu sisään kaikki tiet vievät Kirjaudu-komponenttiin */}
            <Switch>
                <Route exact path='/' component={Kirjaudu} />
                <Route component={Kirjaudu}/>
            </Switch>
          </Grid>
        </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }else {
    //näytetään kun on kirjauduttu sisään (kirjautunut = true)
    return (
      <BrowserRouter>
      <MuiThemeProvider theme={ teema }>
      <CssBaseline />
        <div>
          <AppBar position='static'>
            <Toolbar>
              {/*Menu */}
              <Tooltip title='Menu'>
                <IconButton onClick={ handleMenuOpen } color='inherit' align='right'><MenuIcon /></IconButton>
              </Tooltip>
              {/*Nimi */}
              <Typography className= {classes.otsikko} variant='h4' component='h1'>Labra</Typography>
              {/*Kirjautuminen */}
              <Tooltip title='Kirjaudu ulos'>
                <IconButton color= 'inherit' onClick={handleClickOpen} align='left'>
                  <FaceIcon/>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>

          {/*Drawer-menu */}
          <Drawer anchor='left' open={ menuOpen } onClick={ handleMenuClose }>
            <List>
              <ListItem button component= {Link} to='/uusiTilaus'>
                <ListItemIcon><AddCircleIcon color='primary'/></ListItemIcon>
                <ListItemText primary='UUSI TILAUS' />
              </ListItem>
              <ListItem button component= {Link} to='/tilaukset'>
                <ListItemIcon><FolderSpecialIcon color='primary'/></ListItemIcon>
                <ListItemText primary='TILAUKSET'  />
              </ListItem>
              <ListItem button component= {Link} to='/tyontekijat'>
                <ListItemIcon><AssignmentIndIcon color='primary'/></ListItemIcon>
                <ListItemText primary='TYÖNTEKIJÄT' />
              </ListItem>
              <ListItem button component= {Link} to='/asiakkaat'>
                <ListItemIcon><PeopleIcon color='primary'/></ListItemIcon>
                <ListItemText primary='ASIAKKAAT' />
              </ListItem>
              <ListItem button component= {Link} to='/kayttaja'>
                <ListItemIcon><FaceIcon color='primary'/></ListItemIcon>
                <ListItemText primary='KÄYTTÄJÄ' />
              </ListItem>
            </List>
          </Drawer>

          {/*Dialogi uloskirjautumista varten */}
          <Dialog open={open} onClose={handleClose}>
          <Tooltip title='Kirjaudu ulos'>
            <Button
              onClick={ulos}
              startIcon={<MeetingRoomIcon/>}
              variant='contained'
              color='primary'>
                 Kirjaudu ulos
            </Button>
          </Tooltip>
          <Tooltip title='Poistu'>
            <IconButton onClick={handleClose}>
              <ExitToAppIcon/>
            </IconButton>
          </Tooltip>
          </Dialog>

          {/*Routtaukset komponentteihin */}
          <Switch>
            <Route exact path='/' component={HaeTilaukset} />
            <Route path='/uusiTilaus' component={UusiTilaus}/>
            <Route path='/tilaukset' component={HaeTilaukset}/>
            <Route path='/tyontekijat' component={HaeTyontekijat}/>
            <Route path='/muokkaatilausta/:id/:tuote/:tilauspaiva/:tyontekija/:toimpvm/:hinta/:asiakas/:lisatieto'  component={TilausEdit} />
            <Route path='/uusiTyontekija' component={UusiTyontekija}/>
            <Route path='/asiakkaat' component={HaeAsiakkaat}/>
            <Route path='/uusiAsiakas' component={UusiAsiakas}/>
            <Route path='/lasku/:id/:asiakas' component={Lasku}/>
            <Route path='/kayttaja' render={(props) => <Kayttaja {...props} kayttis= {kayttis}/>} />
            <Route path='/muokkaaAsiakasta/:asiakas_id/:etunimi/:sukunimi/:osoite/:postinumero/:postitoimipaikka' component={EditAsiakas} />
            <Route component={UusiTilaus}/>
          </Switch>
        </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );

  };
};

export default App;
