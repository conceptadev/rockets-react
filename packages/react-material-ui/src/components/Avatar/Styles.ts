import { styled } from '@mui/material/styles';

type Props = {
  size: number;
  onError?: () => void;
};

export const Image = styled('img')<Props>(({ size, onError }) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: '50%',
  margin: '0 12px',
  objectFit: 'cover',
  onError,
}));
