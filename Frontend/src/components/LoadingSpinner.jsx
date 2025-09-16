import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = ({ size = 36 }) => (
  <Box>
    <CircularProgress size={size} />
  </Box>
);

export default LoadingSpinner;
