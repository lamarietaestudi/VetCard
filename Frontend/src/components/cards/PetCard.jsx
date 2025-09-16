import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CardActionArea
} from '@mui/material';

const PetCard = ({ pet, onClick }) => {
  const theme = useTheme();

  const speciesColor =
    theme.palette.species[pet.specie] || theme.palette.species.otro;
  const avatarImage = pet.photo || '/assets/photo-default.png';

  return (
    <Card
      sx={{
        cursor: 'pointer',
        borderTop: `12px solid ${speciesColor}`
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{ padding: '16px', justifyContent: 'center' }}
      >
        <Avatar
          src={avatarImage}
          alt={pet.name}
          sx={{
            width: 72,
            height: 72,
            border: `2px solid ${speciesColor}`,
            bgcolor: 'background.paper',
            margin: '0 auto'
          }}
        />

        <CardContent sx={{ flex: 1, textAlign: 'center' }}>
          <Typography variant='h5'>{pet.name}</Typography>
          <Typography variant='body1' color='text.primary'>
            {pet.specie.charAt(0).toUpperCase() + pet.specie.slice(1)}:{' '}
            {pet.breed}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PetCard;
