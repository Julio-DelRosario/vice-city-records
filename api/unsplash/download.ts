export default async function handler(req: any, res: any) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return res.status(500).json({ error: 'Unsplash API key not configured on server' });
  }

  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'Download URL is required' });
  }

  try {
    // Unsplash requires triggering the download_location endpoint
    const response = await fetch(`${url}?client_id=${accessKey}`);
    
    if (!response.ok) {
      throw new Error(`Unsplash Download Error: ${response.status}`);
    }

    // Best effort, we don't need to return the data, just confirm
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Unsplash Download Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
