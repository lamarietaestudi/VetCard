import { useState } from 'react';
import {
  Box,
  Select,
  TextField,
  MenuItem,
  useTheme,
  useMediaQuery,
  IconButton,
  Collapse
} from '@mui/material';
import SecondaryBtn from './buttons/SecondaryBtn';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = ({
  options = [],
  onSearch,
  disabledOptions = [],
  extraInput
}) => {
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', mb: { xs: 0, sm: 1, md: 2 } }}>
      {isMobile && (
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{ mb: 1, ml: -1, alignSelf: 'flex-start' }}
        >
          <SearchIcon />
          <Box component='span' sx={{ ml: 1, fontSize: 15 }}>
            Buscador
          </Box>
        </IconButton>
      )}
      <Collapse in={!isMobile || open} timeout='auto' unmountOnExit={isMobile}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: { xs: 1, sm: 2, md: 3 },
            mb: 2,
            width: '100%'
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '100%', md: 'auto' }
            }}
          >
            <Select
              displayEmpty
              value={field}
              onChange={(event) => {
                setField(event.target.value);
                setValue('');
              }}
              size='small'
              sx={{
                minWidth: { xs: '100%', sm: '100%', md: 160 },
                width: { xs: '100%', sm: '100%', md: 'auto' }
              }}
            >
              <MenuItem value='' disabled>
                Buscar por...
              </MenuItem>
              {options.map((option) => (
                <MenuItem
                  sx={{ borderBottom: '1px solid #afafafff ' }}
                  key={option.value}
                  value={option.value}
                  disabled={disabledOptions.includes(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              width: { xs: '100%', sm: '100%', md: 'auto' },
              alignItems: 'center',
              gap: 1
            }}
          >
            {extraInput && extraInput({ field, value, setValue }) ? (
              extraInput({ field, value, setValue })
            ) : (
              <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && value) {
                    onSearch(field, value);
                    setField('');
                    setValue('');
                  }
                }}
                size='small'
                placeholder='Escribe aquí tu búsqueda'
                sx={{
                  flex: 1,
                  minWidth: isMobile ? 0 : 200,
                  width: isMobile ? '100%' : 220
                }}
              />
            )}
            <SecondaryBtn
              variant='dark'
              icon={<SearchIcon />}
              onClick={() => {
                onSearch(field, value);
                if (field !== 'all') {
                  setField('');
                  setValue('');
                }
              }}
              disabled={field !== 'all' && !value}
            >
              {' '}
              Buscar
            </SecondaryBtn>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Searchbar;
