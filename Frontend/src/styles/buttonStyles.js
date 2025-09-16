import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const baseButton = (bgColor, hoverColor, textColor) => ({
  backgroundColor: bgColor,
  color: textColor,
  '&hover': {
    backgroundColor: hoverColor,
    color: textColor
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'auto',
  minWidth: 50,
  padding: '6px 12px',
  '& .MuiButton-startIcon': { margin: 0 }
});

export const PrimaryBtnLight = styled(Button)(({ theme }) =>
  baseButton(
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.primary.contrastText
  )
);

export const SecondaryBtnLight = styled(Button)(({ theme }) =>
  baseButton(
    theme.palette.secondary.main,
    theme.palette.secondary.light,
    theme.palette.secondary.contrastText
  )
);

export const PrimaryBtnDark = styled(Button)(({ theme }) =>
  baseButton(
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.contrastText
  )
);

export const SecondaryBtnDark = styled(Button)(({ theme }) =>
  baseButton(
    theme.palette.secondary.main,
    theme.palette.secondary.dark,
    theme.palette.secondary.contrastText
  )
);

export const BackButtonDark = styled(Button)(({ theme }) => ({
  ...baseButton(
    theme.palette.grey[700],
    theme.palette.grey[900],
    theme.palette.text.secondary
  ),
  borderRadius: '50%',
  width: 40,
  height: 40,
  minWidth: 0,
  padding: 0
}));

export const CancelBtnStyle = styled(Button)(({ theme }) =>
  baseButton(
    theme.palette.warning.main,
    theme.palette.warning.dark,
    theme.palette.text.secondary
  )
);

export const DeleteBtnStyle = styled(Button)(({ theme }) =>
  baseButton(
    theme.palette.error.main,
    theme.palette.error.dark,
    theme.palette.text.secondary
  )
);
