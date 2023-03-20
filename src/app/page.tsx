'use client';

import { Button, Card, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const [loginName, setLoginName] = useState('');

  const router = useRouter();

  const { data: userData } = useLogin(loginName);

  if (userData) {
    router.push('/play');
  }

  return (
    <Container maxWidth={'xl'}>
      <Card
        sx={{ width: 350, padding: 2, display: 'flex', flexDirection: 'column', gap: 2, margin: 'auto', marginTop: 2 }}
      >
        <TextField label={'Username'} value={name} onChange={e => setName(e.target.value)} />
        <Button variant={'contained'} onClick={() => setLoginName(name)}>
          Enter
        </Button>
      </Card>
    </Container>
  );
}
