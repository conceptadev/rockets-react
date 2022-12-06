import React, { FC } from 'react';
import { Image } from './Styles';

type Props = {
  src: string;
  alt: string;
  size: number;
  onClick?: () => void;
};

const Avatar: FC<Props> = (props) => {
  const { src, alt, size, onClick } = props;

  return <Image src={src} alt={alt} size={size} onClick={onClick} />;
};

export default Avatar;
