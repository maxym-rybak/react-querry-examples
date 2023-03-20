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
import { useUserPokemons } from '../hooks/useUserPokemons';
import { useMutation, useQueryClient } from 'react-query';
import { removePokemon } from '../app/api/firebase/managePokemons';
import { Pokemon } from '../app/api/entities';

interface UserPokemonsProps {
  username: string;
}

export const UserPokemons: React.FC<UserPokemonsProps> = ({ username }) => {
  const [open, setOpen] = useState(false);
  const [pokemonUrl, setPokemonUrl] = useState('');

  const queryClient = useQueryClient();
  const { data } = useUserPokemons(username);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const mutate = useMutation((pokemon: Pokemon) => removePokemon(username, pokemon.name), {
    onSuccess: removedPokemon => {
      const oldData = queryClient.getQueryState(['userPokemons', username]);
      if (oldData && oldData.data) {
        queryClient.setQueryData(
          ['userPokemons', username],
          (oldData.data as Pokemon[]).filter(p => p.name !== removedPokemon) as Pokemon[]
        );
      }
      setOpen(false);
    },
  });

  const showPokemonDetails = (url: string) => {
    setOpen(true);
    setPokemonUrl(url);
  };

  return (
    <Box>
      <Typography variant={'h3'} color="secondary.main" mb={2}>
        {`${username}'s Pokemons`}
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '800px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="#fff">Pokemon</Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(row => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ textTransform: 'uppercase', color: '#fff' }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <Button
                        sx={{ mr: 1 }}
                        variant="outlined"
                        onClick={() => showPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${row.id}/`)}
                      >
                        {'Info'}
                      </Button>
                    }
                    <Button color="error" variant="outlined" onClick={() => mutate.mutate(row)}>
                      {'Delete'}
                    </Button>
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
