import useStyles from '../../Styles';

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
  const [loading, setLoading] = React.useState(null);

  if(open && options.length === 0 && loading === null) setLoading(true);

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
            setLoading(false);
          }
        });
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setLoading(null);
      setOptions([]);
    }
  }, [open]);

  function inputChange(event, value, reason){
    if(reason !== "reset" || (reason === "reset" && value !== "")){
      setRoom(value);
    }
  }

  function formSubmit(e){
    e.preventDefault();
    if(room !== ''){
      history.push("/room/" + room);
    }
  }

  return(
    <Container component="main" className={classes.RoomSelectMain}>
      <Container maxWidth="xs" className={classes.RoomSelect}>
        <Box component="form" onSubmit={formSubmit}>
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
            onInputChange={inputChange}
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
            className={classes.RoomSelectSubmit}
            onClick={formSubmit}
          >
            Join Room
          </Button>
        </Box>
      </Container>
    </Container>
  )
}

export default RoomSelect;
