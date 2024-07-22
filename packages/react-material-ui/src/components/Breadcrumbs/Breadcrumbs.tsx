import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type RouteItem = {
  href: string;
  label: string;
};

type Props = {
  routes: RouteItem[];
};

export default function Breadcrumbs({ routes }: Props) {
  const breadcrumbs = routes.slice(0, -1).map((routeItem, index) => {
    return (
      <Link
        underline="hover"
        key={index + 1}
        color="inherit"
        href={routeItem.href}
      >
        {routeItem.label}
      </Link>
    );
  });
  const lastItem = routes.at(-1);

  if (!routes.length) {
    return null;
  }

  return (
    <Stack spacing={2}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumbs"
      >
        {breadcrumbs}
        {lastItem ? (
          <Typography color="text.primary">{lastItem.label}</Typography>
        ) : null}
      </MuiBreadcrumbs>
    </Stack>
  );
}
