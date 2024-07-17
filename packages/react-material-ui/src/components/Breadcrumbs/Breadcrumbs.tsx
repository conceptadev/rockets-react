import * as React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  Link,
  Stack,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { usePathname } from 'next/navigation';

import { transformRouteIntoLabel } from './utils';

type Props = {
  customPathname?: string;
};

export default function Breadcrumbs({ customPathname }: Props) {
  const pathname = usePathname();

  const transformedPath = React.useMemo(() => {
    return (customPathname || pathname).slice(1).split('/');
  }, [pathname, customPathname]);

  const routeObjects = React.useMemo(() => {
    return transformedPath.map((item) => ({
      route: `/${item}`,
      label: transformRouteIntoLabel(item),
    }));
  }, [transformedPath]);

  const breadcrumbs = routeObjects.slice(0, -1).map((route, index) => {
    return (
      <Link
        underline="hover"
        key={index + 1}
        color="inherit"
        href={route.route}
      >
        {route.label}
      </Link>
    );
  });

  return (
    <Stack spacing={2}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumbs"
      >
        {breadcrumbs}
        <Typography key={transformedPath.length} color="text.primary">
          {transformRouteIntoLabel(transformedPath.slice(-1)[0])}
        </Typography>
      </MuiBreadcrumbs>
    </Stack>
  );
}
