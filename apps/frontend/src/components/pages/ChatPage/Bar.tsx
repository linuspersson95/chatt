import { AppBar, Toolbar, IconButton, Fab } from '@mui/material';
import { Chat, Add, Logout } from '@mui/icons-material';

export default function Bar() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <IconButton color="inherit">
          <Chat />
        </IconButton>
        <Fab
          sx={{
            position: 'absolute',
            zIndex: 1,
            top: -30,
            left: 0,
            right: 0,
            margin: '0 auto',
          }}
          color="success"
        >
          <Add />
        </Fab>
        <IconButton color="inherit">
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
