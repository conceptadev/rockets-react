import { styled } from '@mui/material/styles'

type Props = {
  size: number
}

export const Image = styled('img')<Props>(({ size }) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: '50%',
  margin: '0 12px',
  objectFit: 'cover',
}))
