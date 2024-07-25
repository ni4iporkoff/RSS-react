import { LoaderFunctionArgs } from 'react-router-dom';
// import { fetchSearchCharacters } from './data';

export async function appLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const initialPage = url.searchParams.get('page') || 1;
  return { initialPage };
}

// export async function characterLoader({ params }: LoaderFunctionArgs) {
//   const searchParam = params.cardID as string;

//   const character = await fetchSearchCharacters(searchParam);

//   return character;
// }
