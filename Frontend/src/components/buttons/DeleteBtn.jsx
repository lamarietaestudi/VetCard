import { DeleteBtnStyle } from '../../styles/buttonStyles';
import { useTheme, useMediaQuery } from '@mui/material';

const DeleteBtn = ({ icon, children, type = 'button', ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const ariaLabel =
    isMobile && typeof children === 'string' ? children : undefined;

  return (
    <DeleteBtnStyle
      variant='contained'
      startIcon={icon}
      aria-label={ariaLabel}
      type={type}
      {...props}
    >
      {!isMobile && children}
    </DeleteBtnStyle>
  );
};

export default DeleteBtn;
