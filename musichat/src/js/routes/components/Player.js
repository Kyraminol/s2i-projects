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
import moment from 'moment';
import VolumeButton from "./VolumeButton";


const Player = (props) => {
  const classes = useStyles(props);
  const [room,] = React.useContext(RoomContext);
  const [sliderValue, setSliderValue] = React.useState(0);
  const [player, setPlayer] = React.useState(null);
  const [timeMark, setTimeMark] = React.useState("");
  const [volume, setVolume] = React.useState(70);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if(player !== null){
      player.setVolume(volume);
    }
  }, [volume, player]);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      controls: 0,
      disablekb: 1,
    },
  };

  const onReady = (e) => {
    setPlayer(e.target);
    setInterval((player, setSliderValue, setTimeMark) => {
      let current = player.getCurrentTime();
      let duration = player.getDuration();
      if(current && duration){
        setSliderValue(current * 100 / duration);
        let markCurrent = moment(0, "ss").seconds(current).format(duration > 3600 ? "HH:mm:ss" : "mm:ss");
        let markTotal = moment(0, "ss").seconds(duration).format(duration > 3600 ? "HH:mm:ss" : "mm:ss");
        setTimeMark(markCurrent + "/" + markTotal);
      }
    }, 100, e.target, setSliderValue, setTimeMark);
    setInterval((player) => {
      let time = player.getCurrentTime();
      if(time && room && room.socket){
        room.socket.emit('sync', {time: time});
      }
    }, 500, e.target);
  };

  const sliderChange = (e, newValue) => {

  };

  const togglePlay = (e) => {
    let state = player.getPlayerState();
    let time = player.getCurrentTime();
    if(state === 1) room.socket.emit('sync', {state: 2, time: time});
    if(state === 2 || state === 5 || state === -1) room.socket.emit('sync', {state: 1, time: time});
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
        <Grid container item xs={12} spacing={2}>
          <Grid item>
            <IconButton onClick={togglePlay}>
              {player !== null && player.getPlayerState() === 1 ? <PauseIcon/> : <PlayArrowIcon/>}
            </IconButton>
            <VolumeButton volume={[volume, setVolume]}/>
          </Grid>
          <Grid item xs className={classes.PlayerSliderGrid}>
            <Slider
              //disabled={player === null}
              disabled
              value={sliderValue}
              onChange={sliderChange}
            />
          </Grid>
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
