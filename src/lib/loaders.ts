import { LoaderFunctionArgs } from 'react-router-dom';
import { fetchCharacters } from './data';

export async function charactersLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const initialPage = url.searchParams.get('page') || undefined;
  const charactersData = await fetchCharacters(initialPage);

  return { charactersData, initialPage };
}
