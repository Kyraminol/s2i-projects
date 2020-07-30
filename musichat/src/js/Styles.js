import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  // General styles
  Navbar: {
    flexWrap: 'wrap',
  },
  NavbarTitle: {
    flexGrow: 1,
  },
  Footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },

  // Styles for RoomSelect.js
  RoomSelectMain: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    display: 'flex !important',
    flexDirection: 'column',
  },
  RoomSelect: {
    flex: '0',
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  RoomSelectSubmit: {
    margin: theme.spacing(2, 0, 0) + ' !important',
  },

  // Styles for Room.js
  RoomMain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  // Styles for Chat.js
  ChatInputRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '1px',
  },
  ChatInputInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  ChatInputIcon: {
    padding: 10,
  },

  // Styles for MessageBubble.js
  MessageBubbleRoot: {
    margin: theme.spacing(0.5),
    flex: '0 0 auto',
    display: 'flex !important',
    flexDirection: 'row',
    '&:nth-of-type(1)': {
      marginTop: 'auto',
    }
  },
  Message: {
    wordBreak: 'break-all',
  },
  MessageBubble: {
    width: '90vw',
  },
  MessageBubbleContainer: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  MessageBubbleTimestamp: {
    paddingRight: '5px',
    color: theme.palette.text.hint,
  },
  MessagesContainer: {
    flexGrow: 1,
    display: 'flex !important',
    flexDirection: 'column',
    overflowY: 'auto',
    minHeight: 0,
    flexBasis: 0,
  },
  UsersListUser: {
    padding: theme.spacing(1, 20, 1, 4) + ' !important',
  },
  UsersListTitle: {
    padding: theme.spacing(1, 20, 1, 2) + ' !important',
  },
  IconButtonRoot: {
    borderRadius: '0 !important',
  },
  IconButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.9rem',
  },
  Player: {
    width: '100%',
    height: '100%',
    padding: '0 5px 5px',
  },
  PlayerHidden: {
    display: 'none',
  },
  PlayerPaper: {
    padding: theme.spacing(1, 3, 1, 1) + ' !important',
  },
  PlayerSliderGrid: {
    marginTop: 'auto !important',
    marginBottom: 'auto !important',
    paddingTop: '13px !important',
  },
  VolumeMenuItem: {
    backgroundColor: 'inherit !important',
    paddingTop: '20px !important',
    paddingBottom: '20px !important',
  },
  VolumeMenuList: {
    padding: '0 !important',
  }
}));

export default useStyles;
