import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActionArea
} from '@mui/material';
import LocalHospital from '@mui/icons-material/LocalHospital';

const MedicalHistoryCard = ({ history, onClick }) => {
  const theme = useTheme();
  const cardColor = theme.palette.medical?.border || theme.palette.primary.main;

  const petName = history.pet?.name || 'Mascota';
  const date = new Date(history.date).toLocaleDateString();
  const type = history.medicalType || 'Tipo de visita';

  return (
    <Card
      sx={{
        cursor: 'pointer',
        borderTop: `12px solid ${cardColor}`
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Avatar
          sx={{
            marginLeft: '18px',
            width: 56,
            height: 56,
            border: `2px solid ${cardColor}`,
            bgcolor: 'background.paper',
            color: cardColor
          }}
        >
          <LocalHospital />
        </Avatar>

        <CardContent sx={{ flex: 1, textAlign: 'center', padding: '0' }}>
          <Typography variant='h5'>{petName}</Typography>
          <Typography variant='body1' color='text.primary'>
            {type}
          </Typography>
          <Typography variant='text1' color='text.primary'>
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MedicalHistoryCard;
