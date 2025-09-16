import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CardActionArea
} from '@mui/material';
import { SecondaryBtnDark } from '../../styles/buttonStyles';

const UserCard = ({ user, onClick }) => {
  const theme = useTheme();
  const userColor = theme.palette.role[user.role] || theme.palette.role.owner;
  const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : '@';

  const roleRaw = Array.isArray(user.role) ? user.role[0] : user.role;
  const roleToLabel = (role) => {
    if (role === 'admin') return 'Administrador@';
    if (role === 'vet') return 'Veterinari@';
    if (role === 'owner') return 'Propietari@';
    return role;
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        borderTop: `12px solid ${userColor}`
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          padding: '12px',
          display: 'flex',
          gap: '8px'
        }}
      >
        <Avatar
          sx={{
            width: 72,
            height: 72,
            border: `2px solid ${userColor}`,
            bgcolor: 'background.paper',
            color: userColor
          }}
        >
          {avatarLetter}
        </Avatar>
        <CardContent
          sx={{
            flex: 1,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <Typography variant='h6'>{user.name}</Typography>
          <Typography variant='text1' color='text.primary'>
            {roleToLabel(roleRaw)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
