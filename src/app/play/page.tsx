'use client';

import {
  ButtonBase,
  Card,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { usePokemons } from '../../hooks/usePokemons';

export default function Play() {
  const { data } = usePokemons();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant={'h3'}>Pokemons to catch!</Typography>
          <TableContainer component={Paper} sx={{ maxHeight: '800px' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Pokemon</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.data.results.map(row => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        {
                          <ButtonBase>
                            <img
                              height={40}
                              src="https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png"
                              alt="Pokeball Clipart Svg - Pokeball Icon @clipartmax.com"
                            />
                          </ButtonBase>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">{'Your pokemons'}</Typography>
          <Card sx={{ height: 800 }}>Empty!</Card>
        </Grid>
      </Grid>
    </Container>
  );
}
