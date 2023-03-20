'use client';

import { Container, Grid } from '@mui/material';
import { PokeapiPokemons } from '../../../content/PokeapiPokemons';
import { UserPokemons } from '../../../content/UserPokemons';

export default function Page({ params }: { params: { user: string } }) {
  return (
    <Container sx={{ paddingTop: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <PokeapiPokemons username={params.user} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserPokemons username={params.user} />
        </Grid>
      </Grid>
    </Container>
  );
}
