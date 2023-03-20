'use client';

import { Button, Card, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const [loginName, setLoginName] = useState('');

  const router = useRouter();

  if (loginName) {
    router.push(`/trainer/${loginName}`);
  }

  return (
    <Container maxWidth={'xl'}>
      <Card
        sx={{
          width: 450,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          position: 'absolute' as const,
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h6" color="#fff" fontWeight={700}>
          {'Write your trainer name'}
        </Typography>
        <TextField label={'Trainer name'} value={name} onChange={e => setName(e.target.value)} />
        <Button variant={'contained'} onClick={() => setLoginName(name)}>
          {'Enter'}
        </Button>
      </Card>
    </Container>
  );
}
