import React, { useMemo } from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  Link,
  Stack,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type RouteItem = {
  href: string;
  label: string;
};

type Props = {
  routes: RouteItem[];
};

export default function Breadcrumbs({ routes }: Props) {
  const breadcrumbs = useMemo(() => {
    return routes.slice(0, -1).map((routeItem, index) => {
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
  }, [routes]);

  const lastItem = useMemo(() => {
    const data = routes.at(-1);

    if (!data) {
      return null;
    }

    return <Typography color="text.primary">{data.label}</Typography>;
  }, []);

  return (
    <Stack spacing={2}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumbs"
      >
        {breadcrumbs}
        {lastItem}
      </MuiBreadcrumbs>
    </Stack>
  );
}
