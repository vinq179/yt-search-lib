import {
  DEFAULT_API_KEY,
  DEFAULT_CLIENT_CONTEXT,
  INNERTUBE_BASE_URL,
  SEARCH_ENDPOINT,
} from './lib/constants.js';
import { LRUCache } from './lib/cache.js';
import { Transport } from './lib/transport.js';
import { parseSearchResults } from './lib/parser.js';

/**
 * Main Client for YouTube InnerTube Search.
 */
export class YouTubeClient {
  /**
   * @param {Object} options
   * @param {string} [options.apiKey] - Override default API key.
   * @param {Object} [options.clientContext] - Override default client context.
   * @param {string} [options.proxyUrl] - URL for CORS proxy.
   * @param {boolean} [options.useCache] - Enable/disable caching (default: true).
   * @param {number} [options.cacheMaxAge] - Cache max age in ms.
   */
  constructor(options = {}) {
    this.apiKey = options.apiKey || DEFAULT_API_KEY;
    this.context = { ...DEFAULT_CLIENT_CONTEXT, ...options.clientContext };

    this.transport = new Transport({
      proxyUrl: options.proxyUrl,
      fetch: options.fetch,
    });

    if (options.useCache !== false) {
      this.cache = new LRUCache('yt_search_', options.cacheMaxAge);
    } else {
      this.cache = null;
    }
  }

  /**
   * Search for videos, channels, playlists.
   * @param {string} query - The search query.
   * @param {Object} [options] - Optional search options.
   * @param {number} [options.limit=5] - Maximum number of results to return.
   * @param {string} [options.type='video'] - Type of results ('video', 'channel', 'playlist', or 'all').
   * @returns {Promise<import('./lib/parser.js').VideoResult[]>}
   */
  async search(query, { limit = 20, type = 'video' } = {}) {
    if (!query) throw new Error('Query is required');

    const cacheKey = `${query}_${limit}_${type}`;
    // Check cache
    if (this.cache) {
      const cached = this.cache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const url = `${INNERTUBE_BASE_URL}${SEARCH_ENDPOINT}?key=${this.apiKey}`;

    let combinedResults = [];
    let continuationToken = null;
    let attempt = 0;
    const maxAttempts = 5; // Safety break

    // Initial Search
    const initialBody = {
      context: { client: this.context },
      query: query,
    };

    try {
      const rawData = await this.transport.post(url, initialBody);
      const parsed = parseSearchResults(rawData);
      combinedResults = parsed.results;
      continuationToken = parsed.continuationToken;

      // Filter type if needed
      if (type !== 'all') {
        combinedResults = combinedResults.filter((item) => item.type === type);
      }

      // Fetch Loop
      while (combinedResults.length < limit && continuationToken && attempt < maxAttempts) {
        attempt++;
        const continuationBody = {
          context: { client: this.context },
          continuation: continuationToken
        };

        const nextRaw = await this.transport.post(url, continuationBody);
        const nextParsed = parseSearchResults(nextRaw);

        let nextResults = nextParsed.results;
        if (type !== 'all') {
          nextResults = nextResults.filter((item) => item.type === type);
        }

        // Deduplicate IDs just in case
        const existingIds = new Set(combinedResults.map(r => r.id));
        nextResults = nextResults.filter(r => !existingIds.has(r.id));

        combinedResults = [...combinedResults, ...nextResults];
        continuationToken = nextParsed.continuationToken;
      }

      const finalResults = combinedResults.slice(0, limit);

      if (this.cache) {
        this.cache.set(cacheKey, finalResults);
      }

      return finalResults;
    } catch (error) {
      console.error('YouTube Search Error:', error);
      throw error;
    }
  }

  /**
   * Clear the search cache.
   */
  clearCache() {
    if (this.cache) {
      this.cache.clear();
    }
  }
}

export default YouTubeClient;
