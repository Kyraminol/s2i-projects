import React from 'react';
import RoomContext from './RoomContext';
import YouTube from 'react-youtube';
import useStyles from "../../Styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';


const Player = (props) => {
  const classes = useStyles(props);
  const [room,] = React.useContext(RoomContext);
  const [sliderValue, setSliderValue] = React.useState(0);
  const [player, setPlayer] = React.useState(null);

  React.useEffect(() => {
    if(room.sync !== null && player !== null){
      switch(room.sync.state){
        case 1:
          player.playVideo();
          break;
        case 2:
          player.pauseVideo();
          break;
        default:
          break;
      }
    }

    
  }, [player, room.sync]);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {},
  };

  const onReady = (e) => {
    setPlayer(e.target);
  };

  const sliderChange = (e, newValue) => {
    setSliderValue(newValue);
  };

  const togglePlay = (e) => {
    let state = player.getPlayerState();
    let time = player.getCurrentTime();
    if(state === 1) room.socket.emit('sync', {state: 2, time: time});
    if(state === 2 || state === 5) room.socket.emit('sync', {state: 1, time: time});
  };

  const onPlay = (e) => {
    console.log('play', e);
  };

  const onPause = (e) => {
    console.log('pause', e);
  };

  const onError = (e) => {};

  const onStateChange = (e) => {
    console.log('state', e);
  };

  const onPlaybackQualityChange = (e) => {};

  const onPlaybackRateChange = (e) => {};

  return(
    <Container>
      <Paper
        className={classes.PlayerPaper}
        style={{'display': (room.url !== null && room.url !== '') ? 'block' : 'none'}}
      >
        <YouTube
          containerClassName={room.player ? classes.Player : classes.PlayerHidden}
          videoId={room.url}
          opts={opts}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onError={onError}
          onStateChange={onStateChange}
          onPlaybackQualityChange={onPlaybackQualityChange}
          onPlaybackRateChange={onPlaybackRateChange}
        />
        { !room.player && (
          <Grid container spacing={2}>
            <Grid item>
              <IconButton onClick={togglePlay}>
                <PlayArrowIcon/>
              </IconButton>
            </Grid>
            <Grid item xs className={classes.PlayerSliderGrid}>
              <Slider
                disabled={player === null}
                value={sliderValue}
                onChange={sliderChange}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>

  )
};

export default Player;
