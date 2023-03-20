'use client';

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { PokemonDetailsModal } from './PokemonDetailsModal';
import { usePokemons } from '../hooks/usePokemons';

export const PokeapiPokemons: React.FC<{ username: string }> = ({ username }) => {
  const [open, setOpen] = useState(false);
  const [pokemonUrl, setPokemonUrl] = useState('');

  const { data } = usePokemons();

  const showPokemonDetails = (url: string) => {
    setOpen(true);
    setPokemonUrl(url);
  };

  return (
    <Box>
      <Typography variant={'h3'} color="secondary.main" mb={2}>
        {'Pokemons to catch!'}
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '800px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="#fff">Pokemon</Typography>
              </TableCell>
              <TableCell color="#fff" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.data.results.map(row => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ textTransform: 'uppercase', color: '#fff' }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <Button variant="outlined" onClick={() => showPokemonDetails(row.url)}>
                        {'Info'}
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PokemonDetailsModal url={pokemonUrl} open={open} setOpen={setOpen} username={username} />
    </Box>
  );
};
