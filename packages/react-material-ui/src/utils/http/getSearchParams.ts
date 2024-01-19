const getSearchParams = (
  searchParams: URLSearchParams,
  newParams: Record<string, string | number>,
) => {
  const newSearchParam = new URLSearchParams(searchParams);

  for (const [key, value] of Object.entries(newParams)) {
    const param = searchParams?.get(key);
    const parsedValue = typeof value === 'number' ? Number(param) : param;

    if (!value) {
      newSearchParam.delete(key);
    } else if (value !== parsedValue) {
      newSearchParam.set(key, String(value));
    }
  }

  const stringfiedNewSearchParam = newSearchParam.toString();

  if (stringfiedNewSearchParam) {
    return stringfiedNewSearchParam;
  }

  return null;
};

export default getSearchParams;
