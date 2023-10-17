import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
} from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../lib/firebase';

export default function UsernameDialog({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const userRef = doc(db, 'user', 'all-trust-user');
    await updateDoc(userRef, {
      username: username,
    });
    handleClose();
    window.location.reload();
  };

  return (
    <Tooltip title="変な名前つけんな" arrow>
      <Box mx={320} my={10}>
        <Button variant="text" onClick={handleClickOpen}>
          {name}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">名前の変更</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              なんの名前にする？
            </DialogContentText>
            <TextField
              id="standard-basic"
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button onClick={handleSubmit} autoFocus>
              変更
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Tooltip>
  );
}
