# Usage Examples & Integration Guides

Learn how to integrate the YouTube Search Library into your projects with real-world code examples.

## 🎯 Getting Started

New to the library? Start here:

1. **[Basic Search](./basic-search.md)** - Your first search query
2. **[Different Content Types](./search-types.md)** - Videos, channels, playlists
3. **[Configuration Guide](../guides/configuration.md)** - Setup options

## 💡 Common Use Cases

| Goal | Guide |
|------|-------|
| **Basic search query** | [Basic Search](./basic-search.md) |
| **Videos, channels, playlists** | [Search Types](./search-types.md) |
| **Improve performance** | [Caching Strategy](./caching-strategy.md) |
| **Error handling** | [Error Handling](./error-handling.md) |
| **React app** | [React Integration](./integration-react.md) |
| **Express backend** | [Express Integration](./integration-express.md) |
| **Multiple searches** | [Parallel Searches](./parallel-searches.md) |
| **Export as JSON** | [JSON Export](./json-export.md) |

## 📚 All Examples

### Basics
- **[Basic Search](./basic-search.md)** - Simple search query and display results
- **[Search Types](./search-types.md)** - Videos, channels, playlists, or all types
- **[Caching Strategy](./caching-strategy.md)** - How to use caching for performance

### Advanced Patterns
- **[Error Handling](./error-handling.md)** - Handle errors and retry logic
- **[Parallel Searches](./parallel-searches.md)** - Execute multiple searches at once
- **[JSON Export](./json-export.md)** - Format results as JSON

### Framework Integration
- **[React Component](./integration-react.md)** - Use in React applications
- **[Express.js API](./integration-express.md)** - Build backend API with Express

## 🔧 Setup

### Install the Library

```bash
npm install yt-search-lib
```

### Configure Environment

Create `.env` file:

```bash
# Development
YOUTUBE_PROXY_URL=http://127.0.0.1:3000/proxy?url=
NODE_ENV=development

# Production
YOUTUBE_PROXY_URL=https://youtube-proxy.onrender.com/proxy?url=
NODE_ENV=production
```

### Quick Start

```javascript
import { YouTubeClient } from 'yt-search-lib';

const client = new YouTubeClient({
  proxyUrl: process.env.YOUTUBE_PROXY_URL
});

const results = await client.search('lofi hip hop', { limit: 5 });
console.log(results);
```

## 📖 Detailed Guides

Each guide includes:
- Complete code examples
- Copy-paste ready code
- Explanation of key concepts
- Common pitfalls and solutions

## 🆘 Need Help?

- **Basic question?** → See [Getting Started](../guides/quick-start.md)
- **Something broken?** → See [Error Handling](./error-handling.md)
- **More info?** → See [API Reference](../api/reference.md)
- **Having issues?** → See [Troubleshooting](../troubleshooting/README.md)

---

**← [Back to Documentation](../README.md)**
