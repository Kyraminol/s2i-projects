// Component for a synced player

// Relative imports
import VolumeButton from './VolumeButton';
import RoomContext from './RoomContext';
import useStyles from '../../Styles';
// Module imports
import React from 'react';
import YouTube from 'react-youtube';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import moment from 'moment';


const Player = (props) => {
  // Create classes names
  const classes = useStyles(props);
  // Import room variables from context
  const [room,] = React.useContext(RoomContext);
  // State of the progress slider
  const [sliderValue, setSliderValue] = React.useState(0);
  // State that holds player object once loaded
  const [player, setPlayer] = React.useState(null);
  // State for formatted time mark
  const [timeMark, setTimeMark] = React.useState("");
  // State of the volume slider
  const [volume, setVolume] = React.useState(70);

  React.useEffect(() => {
    // If room status is receiver and player is set then set according player state
    if(room.status && player){
      switch(room.status){
        case 1:
          player.playVideo();
          break;
        case 2:
          player.pauseVideo();
          break;
        default:
          break;
      }
      // Sync to other users. Seek to farthest users if difference is more than two seconds
      let seekTo = 0;
      room.users.forEach((user) => {
        if(user.name !== room.username){
          if(user.sync - player.getCurrentTime() > 2 && user.sync > seekTo){
            seekTo = user.sync;
          }
        }
      });
      if(seekTo > 0) player.seekTo(seekTo);
    }
  }, [player, room.status, room.username, room.users]);

  // If volume slider is changed and player is set up then change player volume
  React.useEffect(() => {
    if(player !== null){
      player.setVolume(volume);
    }
  }, [volume, player]);

  // react-youtube player options
  const playerOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      controls: 0,
      disablekb: 1,
    },
  };

  // When react-youtube fires ready event then set up player and intervals
  const onReady = (event) => {
    setPlayer(event.target);
    // Recurring interval that updates time mark by parsing seconds with moment module every 100 ms
    setInterval((player, setSliderValue, setTimeMark) => {
      let current = player.getCurrentTime();
      let duration = player.getDuration();
      if(current && duration){
        setSliderValue(current * 100 / duration);
        let markCurrent = moment(0, "ss").seconds(current).format(duration > 3600 ? "HH:mm:ss" : "mm:ss");
        let markTotal = moment(0, "ss").seconds(duration).format(duration > 3600 ? "HH:mm:ss" : "mm:ss");
        setTimeMark(markCurrent + "/" + markTotal);
      }
    }, 100, event.target, setSliderValue, setTimeMark);
    // Recurring interval that emits sync events to socket every 500 ms
    setInterval((player) => {
      let time = player.getCurrentTime();
      if(time && room && room.socket){
        room.socket.emit('sync', {time: time});
      }
    }, 500, event.target);
  };

  // Function called when users changes seek slider
  const sliderChange = () => {};

  // Function to emit sync event to socket based on the opposite of current player state
  const togglePlay = () => {
    let state = player.getPlayerState();
    let time = player.getCurrentTime();
    if(state === 1) room.socket.emit('sync', {state: 2, time: time});
    if(state === 2 || state === 5 || state === -1) room.socket.emit('sync', {state: 1, time: time});
  };

  // Event called by react-youtube when player is set on play
  const onPlay = () => {};

  // Event called by react-youtube when player is set on pause
  const onPause = () => {};

  // Event called by react-youtube when player encounters an error
  const onError = () => {};

  // Event called by react-youtube when player changes state
  const onStateChange = () => {};

  // Event called by react-youtube when player changes playback quality
  const onPlaybackQualityChange = () => {};

  // Event called by react-youtube when player changes playback rate
  const onPlaybackRateChange = () => {};

  return (
    <Container>
      <Paper
        className={classes.PlayerPaper}
        style={{'display': (room.url !== null && room.url !== '') ? 'block' : 'none'}}
      >
        {/* react-youtube component */}
        <YouTube
          // If room player state is false then player is hidden and only controls are shown
          containerClassName={room.player ? classes.Player : classes.PlayerHidden}
          videoId={room.url}
          opts={playerOptions}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onError={onError}
          onStateChange={onStateChange}
          onPlaybackQualityChange={onPlaybackQualityChange}
          onPlaybackRateChange={onPlaybackRateChange}
        />
        <Grid container item xs={12} spacing={2}>
          <Grid item>
            {/* If player is playing then button is pause */}
            {/* If player is not playing then button is play */}
            <IconButton onClick={togglePlay}>
              {player !== null && player.getPlayerState() === 1 ? <PauseIcon/> : <PlayArrowIcon/>}
            </IconButton>
            <VolumeButton volume={[volume, setVolume]}/>
          </Grid>
          <Grid item xs className={classes.PlayerSliderGrid}>
            {/* Seek slider */}
            <Slider
              disabled
              value={sliderValue}
              onChange={sliderChange}
            />
          </Grid>
          {/* If player is loaded then show time mark */}
          {player !== null && (
            <Grid item xs container alignItems="center" style={{"flexGrow": "0"}}>
              <Grid item>
                {timeMark}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  )
};

export default Player;
