// Fetches real memes from Reddit via the free meme-api.com service (no key needed).

export interface RedditMeme {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
}

const MEME_API_BASE = "https://meme-api.com/gimme";

export async function fetchMemes(
  subreddit: string,
  count = 12
): Promise<RedditMeme[]> {
  const response = await fetch(`${MEME_API_BASE}/${subreddit}/${count}`);
  if (!response.ok) {
    throw new Error(`Meme API error: ${response.status}`);
  }

  const data = await response.json();
  const memes: RedditMeme[] = data?.memes ?? [];

  // Keep it safe and mood-lifting: drop NSFW/spoiler posts and non-image links.
  return memes.filter(
    (meme) =>
      !meme.nsfw &&
      !meme.spoiler &&
      /\.(jpe?g|png|gif|webp)$/i.test(meme.url)
  );
}
