import Text from '../Text';
import React, { PropsWithChildren } from 'react';

const Title = ({ children }: PropsWithChildren) => (
  <Text
    variant="h4"
    fontFamily="Inter"
    fontSize={24}
    fontWeight={800}
    mt={4}
    gutterBottom
  >
    {children}
  </Text>
);

export default Title;
