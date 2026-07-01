const WC_BASE_URL = 'https://toptierfind.com/wp-json/wc/v3';

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  average_rating: string;
  rating_count: number;
  images: { src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  short_description: string;
}

async function wcFetch(endpoint: string) {
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;

  if (!key || !secret) {
    console.error('Missing WooCommerce API credentials');
    return null;
  }

  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  try {
    const res = await fetch(`${WC_BASE_URL}${endpoint}`, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`WooCommerce API error: ${res.status} on ${endpoint}`);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error('WooCommerce fetch failed:', err);
    return null;
  }
}

export async function getFeaturedProducts(limit = 4): Promise<WCProduct[]> {
  const data = await wcFetch(`/products?per_page=${limit}&orderby=popularity&status=publish`);
  return data || [];
}

export const CATEGORY_MAP: Record<string, { id: number; name: string }> = {
  'beauty-wellness': { id: 55, name: 'Beauty & Wellness' },
  'electronics': { id: 56, name: 'Electronics' },
  'home-improvement': { id: 54, name: 'Home Improvement' },
  'kitchen-dining': { id: 53, name: 'Kitchen & Dining' },
  'pet-supplies': { id: 58, name: 'Pet Supplies' },
  'sports-outdoor': { id: 57, name: 'Sports & Outdoor' },
};

export async function getProductsByCategorySlug(slug: string, limit = 24): Promise<WCProduct[]> {
  const cat = CATEGORY_MAP[slug];
  if (!cat) return [];
  const data = await wcFetch(`/products?category=${cat.id}&per_page=${limit}&status=publish`);
  return data || [];
}

export async function getCategoryThumbnails(): Promise<Record<string, string>> {
  const slugs = Object.keys(CATEGORY_MAP);

  const results = await Promise.all(
    slugs.map(async (slug) => {
      const cat = CATEGORY_MAP[slug];
      const data = await wcFetch(`/products?category=${cat.id}&per_page=1&status=publish`);
      const image = data?.[0]?.images?.[0]?.src || null;
      return [slug, image];
    })
  );

  return Object.fromEntries(results.filter(([, img]) => img !== null));
}