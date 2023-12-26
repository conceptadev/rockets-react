'use client';

import { useState } from 'react';
import { Container, Box } from '@mui/material';
import { AutocompleteField } from '@concepta/react-material-ui';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import { type Product } from './constants';

const uri = 'https://fakestoreapi.com/products';

const Autocomplete = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, selectOption] = useState<string | null>(null);

  const { get } = useDataProvider();

  const { isPending: isLoadingProducts } = useQuery(() => get({ uri }), true, {
    onSuccess(data) {
      const transformedData = data.map((product: Product) => ({
        label: product.title,
        value: String(product.id),
      }));

      setOptions(transformedData);
    },
  });

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <h1>Autocomplete</h1>
      <Box sx={{ marginTop: '32px' }}>
        <p>Select or type a product:</p>
        <Box sx={{ marginTop: '8px' }}>
          <AutocompleteField
            options={options}
            isLoading={isLoadingProducts}
            currentValue={selectedOption || ''}
            defaultValue={undefined}
            onChange={(value) => selectOption(value)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Autocomplete;
