import useStyles from '../../styles';

import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function RoomSelect(props){
  const classes = useStyles(props);
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [room, setRoom] = React.useState('');
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      axios.get('/api/v1/room')
        .then((r) => {
          if(active){
            setOptions(r.data);
          }
        });
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  function onInputChange(event, value, reason){
    if(reason !== "reset" || (reason === "reset" && value !== "")){
      setRoom(value);
    }
  }

  function join(){
    history.push("/room/" + room);
  }

  return(
    <Container component="main" className={classes.LandingMain}>
      <Container maxWidth="xs" className={classes.Landing}>
        <Box>
          <Typography component="h1" variant="h4">
            Musichat
          </Typography>
          <Typography component="h1" variant="subtitle2" gutterBottom>
            Select an existing room or create a new one
          </Typography>
          <Autocomplete
            freeSolo
            selectOnFocus
            handleHomeEndKeys
            id="room"
            disableClearable
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            renderOption={(option,) => option.name + " (" + option.users + " online)"}
            getOptionLabel={(option) => option.name || ""}
            options={options}
            loading={loading}
            inputValue={room}
            onInputChange={onInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                margin="normal"
                fullWidth
                name="room"
                label="Room"
                InputProps={{
                  ...params.InputProps, type: 'search',
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={35} /> : null}
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {open ? setOpen(false) : setOpen(true)}}
                        >
                          {open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                        </IconButton>
                      </InputAdornment>
                    </>
                  ),
                }}

              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={join}
          >
            Join Room
          </Button>
        </Box>
      </Container>
    </Container>
  )
}

export default RoomSelect;
