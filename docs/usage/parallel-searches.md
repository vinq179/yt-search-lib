# Parallel & Multiple Searches

Execute multiple searches efficiently.

## 🚀 Parallel Searches

```javascript
import { YouTubeClient } from 'yt-search-lib';

const client = new YouTubeClient({
  proxyUrl: 'http://127.0.0.1:3000/proxy?url='
});

// Search multiple queries in parallel
const queries = ['lofi hip hop', 'jazz', 'ambient'];

const results = await Promise.all(
  queries.map(query => client.search(query, { limit: 5 }))
);

// results[0] = lofi hip hop results
// results[1] = jazz results
// results[2] = ambient results

results.forEach((result, i) => {
  console.log(`${queries[i]}: ${result.length} results`);
});
```

## 📊 Parallel with Error Handling

```javascript
const queries = ['javascript', 'python', 'rust'];

const results = await Promise.allSettled(
  queries.map(query =>
    client.search(query, { limit: 5 }).catch(err => {
      console.error(`Failed to search ${query}: ${err.message}`);
      throw err;
    })
  )
);

// Check results
results.forEach((result, i) => {
  if (result.status === 'fulfilled') {
    console.log(`✓ ${queries[i]}: ${result.value.length} results`);
  } else {
    console.log(`✗ ${queries[i]}: ${result.reason.message}`);
  }
});
```

## 🔄 Sequential Searches

```javascript
// Run searches one after another
async function sequentialSearch(queries) {
  const allResults = [];

  for (const query of queries) {
    console.log(`Searching: ${query}...`);
    const results = await client.search(query, { limit: 5 });
    allResults.push({ query, results });
    
    // Add delay between requests (respectful rate limiting)
    await new Promise(r => setTimeout(r, 1000));
  }

  return allResults;
}

// Usage
const results = await sequentialSearch(['lofi', 'jazz', 'ambient']);
```

## 🎯 Search Different Types in Parallel

```javascript
// Search for videos, channels, and playlists in parallel
const [videos, channels, playlists] = await Promise.all([
  client.search('music', { limit: 5, type: 'video' }),
  client.search('music', { limit: 5, type: 'channel' }),
  client.search('music', { limit: 5, type: 'playlist' })
]);

console.log(`Videos: ${videos.length}`);
console.log(`Channels: ${channels.length}`);
console.log(`Playlists: ${playlists.length}`);
```

## 🏃 Race Conditions

```javascript
// Return first successful result
const fastestResult = await Promise.race([
  client.search('lofi', { limit: 5 }),
  client.search('jazz', { limit: 5 }),
  client.search('ambient', { limit: 5 })
]);

console.log('Fastest result:', fastestResult);
```

## 💡 Tips

- **Use parallel for independent searches** - Faster execution
- **Use sequential for dependent searches** - One search informs the next
- **Add delays between requests** - Respectful rate limiting
- **Use allSettled** - Continue even if some searches fail
- **Limit concurrent requests** - Don't overwhelm the server

---

**← [Back to Usage Examples](./README.md)**
