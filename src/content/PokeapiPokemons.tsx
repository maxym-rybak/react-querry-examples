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
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { PokemonDetailsModal } from './PokemonDetailsModal';
import { usePokemons } from '../hooks/usePokemons';

export const PokeapiPokemons: React.FC<{ username: string }> = ({ username }) => {
  const [open, setOpen] = useState(false);
  const [pokemonUrl, setPokemonUrl] = useState('');

  const showPokemonDetails = (url: string) => {
    setOpen(true);
    setPokemonUrl(url);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data, isLoading } = usePokemons(rowsPerPage, page * rowsPerPage);

  return (
    <Box>
      <Typography variant={'h3'} color="secondary.main" mb={2}>
        {'Wild Pokemons'}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="#fff">Pokemon</Typography>
              </TableCell>
              <TableCell color="#fff" align="right" />
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

        {!isLoading && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={data?.data.count ? Math.floor(data?.data.count / rowsPerPage) : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>

      <PokemonDetailsModal url={pokemonUrl} open={open} setOpen={setOpen} username={username} />
    </Box>
  );
};
