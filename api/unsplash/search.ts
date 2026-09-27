export default async function handler(req: any, res: any) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return res.status(500).json({ error: 'Unsplash API key not configured on server' });
  }

  const { query, page = '1', per_page = '12' } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query as string)}&page=${page}&per_page=${per_page}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Unsplash Search Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
