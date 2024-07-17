export const capitalizeString = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const transformRouteIntoLabel = (route: string) => {
  return capitalizeString(route.split('-').join(' '));
};
