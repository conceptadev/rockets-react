'use client';

import { Box, Grid as MuiGrid, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

type GridItem = {
  href: string;
  title: string;
};

type GridProps = {
  title: string;
  items: GridItem[];
};

export const GridItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  height: '200px',
  width: '200px',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export const GridItemContent = styled(Link)(({ theme }) => ({
  marginTop: 'auto',
  textDecoration: 'none',
  color: 'black',
  fontWeight: theme.typography.fontWeightBold,
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  fontSize: 18,
}));

export const Grid = ({ title, items }: GridProps) => {
  return (
    <>
      <h2>{title}</h2>
      <Box sx={{ padding: '32px 0' }}>
        <MuiGrid container spacing={2}>
          {items.map((item) => (
            <MuiGrid key={item.href.split('/').join('-')} item xs={3}>
              <GridItem>
                <GridItemContent href={item.href}>{item.title}</GridItemContent>
              </GridItem>
            </MuiGrid>
          ))}
        </MuiGrid>
      </Box>
    </>
  );
};
