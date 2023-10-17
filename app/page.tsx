'use client';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import styles from './page.module.css';

// Import the functions you need from the SDKs you need

export default function Home() {
  const [posts, setPosts] = useState([
    {
      id: uuid(),
      username: 'お前の名前',
      text: 'Hello world',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');

  const firebaseConfig = {
    apiKey: 'AIzaSyCtwQsjRg6eFfIbrTmAeU-crKep_cSQF6Q',
    authDomain: 'all-trust-sns.firebaseapp.com',
    projectId: 'all-trust-sns',
    storageBucket: 'all-trust-sns.appspot.com',
    messagingSenderId: '291700971474',
    appId: '1:291700971474:web:95d0d5691fb97c4c6e5a0b',
    measurementId: 'G-ST4KTTQE6B',
  };

  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore();
  // const analytics = getAnalytics(app);

  const handlePost = async () => {
    try {
      // const docRef = await addDoc(collection(db, 'posts'), {
      //   text: input,
      //   timestamp: new Date().toISOString(),
      // });
      setPosts([
        ...posts,
        {
          id: uuid(),
          username: 'お前の名前',
          text: input,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  useEffect(() => {
    // const fetchPosts = async () => {
    //   const querySnapshot = await getDocs(collection(db, 'posts'));
    //   setPosts(querySnapshot.docs.map((doc) => doc.data()));
    // };
    // fetchPosts();
  }, []);

  return (
    <main className={styles.main}>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          spacing={2}
          my={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Avatar />
          </Box>
          <Tooltip title="変な名前つけんな">
            <Typography>お前の名前</Typography>
          </Tooltip>
          <Tooltip title="押せると思うなよゴミが" arrow>
            <FingerprintIcon color="secondary" />
          </Tooltip>
        </Stack>
        <TextField
          id="outlined-multiline-static"
          label="何している？"
          multiline
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          color="secondary"
          fullWidth
        />
        <Box textAlign="right">
          <Tooltip title="押すんか？" placement="top" arrow>
            <Button
              onClick={handlePost}
              variant="contained"
              sx={{ margin: '8px' }}
            >
              つぶやけ
            </Button>
          </Tooltip>
        </Box>
        <List
          sx={{
            width: '100%',
            overflowY: 'auto',
            height: '32rem',
          }}
        >
          {posts.map((post) => (
            <Box key={post.timestamp}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {post.text}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Box>
          ))}
        </List>
      </Container>
    </main>
  );
}
