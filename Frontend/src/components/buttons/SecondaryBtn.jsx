import { SecondaryBtnLight, SecondaryBtnDark } from '../../styles/buttonStyles';
import { useTheme, useMediaQuery } from '@mui/material';

const SecondaryBtn = ({
  variant = 'light',
  icon,
  children,
  type = 'button',
  forceShowText = false,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const Comp = variant === 'dark' ? SecondaryBtnDark : SecondaryBtnLight;

  const ariaLabel =
    isMobile && typeof children === 'string' ? children : undefined;

  return (
    <Comp
      variant='contained'
      startIcon={icon}
      aria-label={ariaLabel}
      type={type}
      {...props}
    >
      {(!isMobile || forceShowText) && children}
    </Comp>
  );
};

export default SecondaryBtn;
