// Component for selecting and joining a room

// Relative imports
import useStyles from '../../Styles';
// Module imports
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


const RoomSelect = (props) => {
  // Create classes names
  const classes = useStyles(props);
  // Import history state from react-router
  const history = useHistory();

  // Open state of the autocomplete
  const [open, setOpen] = React.useState(false);
  // Options array for the autocomplete
  const [options, setOptions] = React.useState([]);
  // Selected room name
  const [roomName, setRoomName] = React.useState('');
  // Loading state for the autocomplete
  const [loading, setLoading] = React.useState(null);

  // If autocomplete is open, options are empty and is not already loading then set loading state to true
  if(open && options.length === 0 && loading === null) setLoading(true);

  React.useEffect(() => {
    let active = true;

    // If is not loading, exit function
    if (!loading) {
      return undefined;
    }

    // Load room list from the server
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
    // Function called when autocomplete is closed, resets loading state and options
    if (!open) {
      setLoading(null);
      setOptions([]);
    }
  }, [open]);

  // Function called when autocomplete is changed, updates room name state
  const inputChange = (event, value, reason) => {
    if(reason !== 'reset' || (reason === 'reset' && value !== '')){
      setRoomName(value);
    }
  }

  // Function called when form is submitted, pushes room to history
  const formSubmit = (event) => {
    event.preventDefault();
    if(roomName !== ''){
      history.push('/room/' + roomName);
    }
  }

  return (
    <Container component="main" className={classes.RoomSelectMain}>
      <Container maxWidth="xs" className={classes.RoomSelect}>
        <Box component="form" onSubmit={formSubmit}>
          {/* Form title */}
          <Typography component="h1" variant="h4">
            Musichat
          </Typography>
          {/* Form subtitle  */}
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
            // Render formatting: "RoomName (x online)"
            renderOption={(option,) => option.name + ' (' + option.users + ' online)'}
            // If option has no name then hide option
            getOptionLabel={(option) => option.name || ''}
            options={options}
            loading={loading}
            inputValue={roomName}
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
                      {/* If loading then show a circular spinner */}
                      {loading ? <CircularProgress color="inherit" size={35} /> : null}
                      {/* If autocomplete is open shows an upward (closing) arrow */}
                      {/* if autocomplete is closed shows a downward (opening) arrow */}
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
          {/* Submitting button */}
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
