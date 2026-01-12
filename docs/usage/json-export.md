# Export Results as JSON

Format search results as JSON for APIs and data processing.

## 🚀 Basic JSON Export

```javascript
import { YouTubeClient } from 'yt-search-lib';

const client = new YouTubeClient({
  proxyUrl: 'http://127.0.0.1:3000/proxy?url='
});

const results = await client.search('lofi', { limit: 5 });

// Convert to JSON
const json = JSON.stringify(results, null, 2);
console.log(json);
```

**Output:**
```json
[
  {
    "id": "jfKfPfyJRdk",
    "title": "lofi hip hop radio 📚 beats to relax/study to",
    "author": "Lofi Girl",
    "link": "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    "thumbnail": "https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg",
    "type": "video",
    "duration": "2:27:32",
    "views": "1.2M",
    "uploadedAt": "3 years ago"
  }
]
```

## 📦 Wrap Results with Metadata

```javascript
async function searchAsJSON(query, limit = 5) {
  const results = await client.search(query, { limit });

  return {
    query: query,
    timestamp: new Date().toISOString(),
    resultCount: results.length,
    results: results.map(video => ({
      id: video.id,
      title: video.title,
      author: video.author,
      link: video.link,
      thumbnail: video.thumbnail,
      type: video.type,
      duration: video.duration,
      views: video.views,
      uploadedAt: video.uploadedAt
    }))
  };
}

// Usage
const json = await searchAsJSON('javascript', 10);
console.log(JSON.stringify(json, null, 2));
```

**Output:**
```json
{
  "query": "javascript",
  "timestamp": "2024-01-12T10:30:00.000Z",
  "resultCount": 10,
  "results": [
    {
      "id": "abc123",
      "title": "JavaScript Tutorial",
      "author": "Traversy Media",
      "link": "https://www.youtube.com/watch?v=abc123",
      "thumbnail": "...",
      "type": "video",
      "duration": "1:23:45",
      "views": "5M",
      "uploadedAt": "2 years ago"
    }
  ]
}
```

## 💾 Save to File

```javascript
import fs from 'fs';

async function searchAndSaveJSON(query, filename) {
  const results = await client.search(query, { limit: 10 });

  const json = {
    query: query,
    timestamp: new Date().toISOString(),
    results: results
  };

  fs.writeFileSync(filename, JSON.stringify(json, null, 2));
  console.log(`Saved to ${filename}`);
}

// Usage
await searchAndSaveJSON('lofi', 'search-results.json');
```

## 🔄 Transform Results

```javascript
// Simplify results for API response
function simplifyResults(results) {
  return results.map(item => ({
    id: item.id,
    title: item.title,
    channel: item.author,
    url: item.link,
    thumbnail: item.thumbnail,
    type: item.type
  }));
}

const results = await client.search('music', { limit: 5 });
const simplified = simplifyResults(results);
console.log(JSON.stringify(simplified, null, 2));
```

## 🏷️ Filter and Transform

```javascript
async function getVideoJSON(query) {
  const results = await client.search(query, { limit: 10, type: 'all' });

  // Filter to videos only
  const videos = results.filter(r => r.type === 'video');

  // Transform for API
  return videos.map(v => ({
    videoId: v.id,
    title: v.title,
    channel: v.author,
    watchUrl: v.link,
    thumbnailUrl: v.thumbnail,
    duration: v.duration,
    viewCount: v.views,
    uploadedAt: v.uploadedAt
  }));
}

const json = await getVideoJSON('javascript');
console.log(JSON.stringify(json, null, 2));
```

## 📤 API Endpoint

```javascript
// Express example
import express from 'express';
import { YouTubeClient } from 'yt-search-lib';

const app = express();
const client = new YouTubeClient({ 
  proxyUrl: process.env.YOUTUBE_PROXY_URL 
});

app.get('/api/search', async (req, res) => {
  try {
    const { q, limit = 5 } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query required' });
    }

    const results = await client.search(q, { limit: parseInt(limit) });

    res.json({
      query: q,
      count: results.length,
      results: results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

**Usage:**
```bash
curl "http://localhost:3000/api/search?q=lofi&limit=5"
```

---

**← [Back to Usage Examples](./README.md)**
