'use client';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
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
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import UsernameDialog from '../components/usernameDialog';
import { db } from '../lib/firebase';
import styles from './page.module.css';

// Import the functions you need from the SDKs you need

export default function Home() {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [user, setUser] = useState<DocumentData>();
  const [input, setInput] = useState('');
  const fetchData = async () => {
    const q = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc'),
      limit(30),
    );
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map((doc) => doc.data());
    return posts;
  };

  const fetchUser = async () => {
    const docRef = doc(db, 'user', 'all-trust-user');
    try {
      const doc = await getDoc(docRef);
      return doc.data();
    } catch (e) {
      console.log('Error getting cached document:', e);
    }
  };

  useEffect(() => {
    fetchData().then((posts) => setPosts(posts));
    fetchUser().then((user) => setUser(user));
  }, []);

  const handlePost = async () => {
    try {
      const postsRef = collection(db, 'posts');
      await addDoc(postsRef, {
        text: input,
        timestamp: new Date().toISOString(),
      });
      fetchData().then((posts) => setPosts(posts));
      setInput('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

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
            <Avatar
              alt="haruka"
              src="https://pbs.twimg.com/profile_images/1676935943499165696/CQfBVnXa_400x400.jpg"
            />
          </Box>
          <Tooltip title="変な名前つけんな">
            <UsernameDialog name={user?.username as string} />
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
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider disabled defaultValue={30} aria-label="Disabled slider" />
          <VolumeUp />
        </Stack>
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
                  <Avatar
                    alt="haruka"
                    src="https://pbs.twimg.com/profile_images/1676935943499165696/CQfBVnXa_400x400.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={user?.username}
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
