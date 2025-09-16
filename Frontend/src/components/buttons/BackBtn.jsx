import { BackButtonDark } from '../../styles/buttonStyles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const BackBtn = ({ children, ...props }) => {
  return (
    <BackButtonDark {...props}>
      <ArrowBackIosNewIcon />
      {children}
    </BackButtonDark>
  );
};

export default BackBtn;
