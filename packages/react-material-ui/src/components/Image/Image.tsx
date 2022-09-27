import React, { FC } from 'react';

type Props = {
  src: string;
  alt: string;
};

const Image: FC<Props> = (props) => {
  const { src, alt } = props;

  return <img src={src} alt={alt} />;
};

export default Image;
