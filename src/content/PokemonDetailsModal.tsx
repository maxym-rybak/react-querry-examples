import React from 'react';
import { usePokemonDetailedInfo } from '../hooks/usePokemonDetailedInfo';
import { Box, Button, Card, Modal, Typography } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { addPokemon } from '../app/api/firebase/managePokemons';
import { Pokemon } from '../app/api/entities';
import { UseMutationResult } from 'react-query/types/react/types';

interface PokemonDetailsModalProps {
  username: string;
  url: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const delay = (delayInMs: number) => {
  return new Promise(resolve => setTimeout(resolve, delayInMs));
};

const randomBoolean = () => {
  return Math.random() >= 0.5;
};

export const PokemonDetailsModal: React.FC<PokemonDetailsModalProps> = ({ url, open, setOpen, username }) => {
  const { data } = usePokemonDetailedInfo(url);

  const queryClient = useQueryClient();
  const catchPokemon = async (): Promise<Pokemon> => {
    await delay(1000);
    if (username && data && randomBoolean()) {
      await addPokemon(username, data);
      return data;
    } else {
      throw new Error('Failed to catch!');
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const mutation: UseMutationResult = useMutation(catchPokemon, {
    onSuccess: (pokemon: Pokemon) => {
      const oldData = queryClient.getQueryState(['userPokemons', username]);
      if (oldData && oldData.data) {
        if (!(oldData.data as Pokemon[]).find(p => p.name === pokemon.name)) {
          queryClient.setQueryData(['userPokemons', username], [...(oldData.data as Pokemon[]), pokemon]);
        }
      } else {
        queryClient.setQueryData(['userPokemons', username], [pokemon]);
      }
      setOpen(false);
    },
    onError: () => {
      setTimeout(() => mutation.reset(), 2000);
    },
  });

  return (
    <Modal open={open} onClose={() => setOpen(false)} key={url}>
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
                <Box display={'flex'} justifyContent={'space-between'} key={elem.stat.name}>
                  <Typography textTransform="capitalize" fontWeight={700}>
                    {elem.stat.name}:
                  </Typography>
                  <Typography>{elem.base_stat}</Typography>
                </Box>
              ))}
          </Box>
          {Boolean(mutation.error) && (
            <Typography color={'error'}>{`${(mutation.error as Error).message ?? 'Something went wrong'}`}</Typography>
          )}
          <Button
            variant={'outlined'}
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={() => mutation.mutate(username)}
            disabled={mutation.isLoading || mutation.isError}
          >
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
