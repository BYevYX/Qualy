import { DOMAIN } from 'src/routes';

export function getFullUrl(path: string, queryParams?: Record<string, string>) {
  const confirmPath = new URL(path, DOMAIN).toString();
  const query = new URLSearchParams(queryParams).toString();
  return confirmPath + '?' + query;
}

export const createQueryStringAndPath = (
  path: string,
  queryParams: Record<string, string>,
) => {
  const params = new URLSearchParams(queryParams);
  return path + '?' + params.toString();
};
