import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  let usersLabel = 'Usuarios';
  if (userRole === 'owner') usersLabel = 'Veterinarios/as';
  else if (userRole === 'vet') usersLabel = 'Propietarios/as';

  const sidebarLinks = [
    { label: 'Mascotas', icon: <PetsIcon />, path: '/dashboard/pets' },
    { label: usersLabel, icon: <PeopleIcon />, path: '/dashboard/users' },
    {
      label: 'Historiales médicos',
      icon: <AssignmentIcon />,
      path: '/dashboard/medical-histories'
    },
    {
      label: 'Mi cuenta',
      icon: <AccountCircleIcon />,
      path: '/dashboard/profile'
    }
  ];

  return (
    <Box
      sx={{
        width: collapsed ? 64 : 220,
        height: '100%',
        boxShadow: 2,
        bgcolor: theme.palette.background.greenMedium,
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: collapsed ? 'center' : 'flex-start',
        transition: 'width 0.2s'
      }}
    >
      <IconButton
        onClick={() => {
          setCollapsed((prev) => !prev);
        }}
        sx={{
          mt: 1,
          mb: 2,
          color: theme.palette.text.secondary,
          alignSelf: collapsed ? 'center' : 'flex-end'
        }}
        aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}
      >
        <MenuOpenIcon
          sx={{
            transform: collapsed ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s'
          }}
        />
      </IconButton>
      <List sx={{ width: '100%', flex: 1 }}>
        {sidebarLinks.map(({ label, icon, path }) => {
          const selected = location.pathname.startsWith(path);
          return (
            <Tooltip
              key={label}
              title={collapsed ? label : ''}
              placement='right'
              arrow
              disableHoverListener={!collapsed}
            >
              <ListItemButton
                selected={selected}
                onClick={() => {
                  navigate(path);
                }}
                sx={{
                  mb: 1,
                  color: selected
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                  minHeight: 48,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  px: collapsed ? 0 : 2,
                  '&:hover': !selected && {
                    bgcolor: theme.palette.primary.dark,
                    color: theme.palette.primary.contrastText
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 36,
                    justifyContent: 'center'
                  }}
                >
                  {icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: 'bold'
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
