import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      {
        name: 'vite-plugin-vercel-api-mock',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith('/api/unsplash/search')) {
              const accessKey = env.UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY;
              if (!accessKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Unsplash API key not configured on server' }));
                return;
              }
              try {
                const urlObj = new URL(req.url, `http://${req.headers.host}`);
                const query = urlObj.searchParams.get('query');
                const page = urlObj.searchParams.get('page') || '1';
                const per_page = urlObj.searchParams.get('per_page') || '12';
                
                if (!query) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Query parameter is required' }));
                  return;
                }
                
                const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`;
                const fetchRes = await fetch(url, {
                  headers: { Authorization: `Client-ID ${accessKey}` }
                });
                
                res.statusCode = fetchRes.status;
                res.setHeader('Content-Type', 'application/json');
                const data = await fetchRes.json();
                res.end(JSON.stringify(data));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
              return;
            }

            if (req.url?.startsWith('/api/unsplash/download')) {
              const accessKey = env.UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY;
              if (!accessKey) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Unsplash API key not configured on server' }));
                return;
              }
              try {
                const urlObj = new URL(req.url, `http://${req.headers.host}`);
                const targetUrl = urlObj.searchParams.get('url');
                if (targetUrl) {
                  await fetch(`${targetUrl}?client_id=${accessKey}`);
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
              return;
            }
            
            next();
          });
        }
      }
    ],
  };
});
