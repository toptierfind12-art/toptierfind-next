import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: [{ source_url: string }];
    'wp:term'?: [[{ name: string }]];
  };
}

// Fallback posts if WP API fails
const fallbackPosts = [
  {
    id: 1,
    slug: 'best-home-workout-equipment',
    title: 'Best Home Workout Equipment in 2025 (Tested)',
    excerpt: 'We tested 30+ pieces of home fitness gear so you don\'t have to. Here are our top picks for every budget.',
    date: '2025-06-01',
    image: 'https://picsum.photos/seed/workout2025/600/400',
    category: 'Fitness',
  },
  {
    id: 2,
    slug: 'keto-beginners-guide',
    title: 'Keto Diet Beginner\'s Guide: What Actually Works',
    excerpt: 'Everything you need to start keto without the confusion — macros, meal ideas, supplements, and common mistakes.',
    date: '2025-06-05',
    image: 'https://picsum.photos/seed/ketoguide/600/400',
    category: 'Nutrition',
  },
  {
    id: 3,
    slug: 'skincare-routine-order',
    title: 'The Right Order for Your Skincare Routine',
    excerpt: 'Applying products in the wrong order wastes money. Here\'s the exact sequence dermatologists recommend.',
    date: '2025-06-10',
    image: 'https://picsum.photos/seed/skincareroutine/600/400',
    category: 'Skincare',
  },
];

async function fetchBlogPosts() {
  try {
    const res = await fetch(
      'https://toptierfind.com/wp-json/wp/v2/posts?per_page=3&_embed=true',
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    if (!res.ok) throw new Error('WP API failed');
    const posts: WPPost[] = await res.json();
    return posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title.rendered.replace(/&#8217;/g, "'").replace(/&#8211;/g, '–'),
      excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 140) + '…',
      date: p.date,
      image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${p.slug}/600/400`,
      category: p._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog',
    }));
  } catch {
    return fallbackPosts;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogSection() {
  const posts = await fetchBlogPosts();

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#00A699] text-xs font-semibold uppercase tracking-widest mb-3 block">
              From the Blog
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Latest{' '}
              <span className="text-[#FF5A5F]">Articles</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-white/50 hover:text-[#00A699] font-medium transition-colors duration-200 group"
          >
            View All Posts
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block bg-[#16213E] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00A699]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/20"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16213E]/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#00A699]/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-white/30 text-xs mb-3">
                  <Clock size={12} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-[#00A699] transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-[#FF5A5F] text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                  <span>Read More</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
