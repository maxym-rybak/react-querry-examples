import React from 'react';
import { usePokemonDetailedInfo } from '../hooks/usePokemonDetailedInfo';
import { Box, Button, Card, Modal, Skeleton, Typography } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { addPokemon } from '../app/api/firebase/managePokemons';
import { Pokemon } from '../app/api/entities';

interface PokemonDetailsModalProps {
  username: string;
  url: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const delay = (delayInms: number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

export const PokemonDetailsModal: React.FC<PokemonDetailsModalProps> = ({ url, open, setOpen, username }) => {
  const { data, isLoading } = usePokemonDetailedInfo(url);

  const queryClient = useQueryClient();
  const catchPokemon = async () => {
    await delay(1000);
    if (data) {
      await addPokemon(username, data);
      return data;
    } else {
      throw new Error('No data');
    }
  };

  const mutation = useMutation(catchPokemon, {
    onSuccess: (pokemon: Pokemon) => {
      const oldData = queryClient.getQueryState(['userPokemons', username]);
      if (oldData && oldData.data) {
        queryClient.setQueryData(['userPokemons', username], [...(oldData.data as Pokemon[]), pokemon]);
      } else {
        queryClient.setQueryData(['userPokemons', username], [pokemon]);
      }
      setOpen(false);
    },
    onError: (error: Error) => {
      console.error('Tut bedosya!!', error);
    },
  });

  if (isLoading) {
    return <Skeleton variant={'rectangular'} height={'200px'} />;
  }
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Card
        sx={{
          width: '300px',
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 2,
        }}
      >
        <Box
          flex={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography textTransform={'uppercase'} fontWeight={700} color={'#fff'}>
            {data?.name}
          </Typography>
          <Box sx={{ border: '1px solid #fff', width: '100%', marginBottom: 1, marginTop: 1, textAlign: 'center' }}>
            {data && <img src={data.sprites.back_default} alt={data.name} height={150} />}
          </Box>
          <Box width={'100%'} color={'#fff'} textAlign={'left'}>
            {data &&
              data.stats.map(elem => (
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography textTransform="capitalize" fontWeight={700}>
                    {elem.stat.name}:
                  </Typography>
                  <Typography>{elem.base_stat}</Typography>
                </Box>
              ))}
          </Box>
          <Button variant={'outlined'} fullWidth sx={{ marginTop: 2 }} onClick={() => mutation.mutate()}>
            {!mutation.isLoading ? (
              <>
                <img
                  height={40}
                  src="https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png"
                  alt="Pokeball Clipart Svg - Pokeball Icon @clipartmax.com"
                />
                {'Catch!'}
              </>
            ) : (
              'Loading...'
            )}
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};
