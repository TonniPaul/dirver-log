import enVariables from '@/utils/env';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://api.mapbox.com/search/searchbox/v1/suggest';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchText = req.query.q;

  try {
    const response = await fetch(
      `${BASE_URL}?q=${searchText}&language=en&limit=8&session_token=[GENERATED-UUID]&access_token=${enVariables.mapboxAccessToken}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status} `);
    }

    const searchResult = await response.json();

    res.status(200).json(searchResult);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
