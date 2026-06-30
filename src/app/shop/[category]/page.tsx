import { getProductsByCategorySlug, CATEGORY_MAP } from '@/lib/woocommerce';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ category: slug }));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categoryInfo = CATEGORY_MAP[params.category];
  if (!categoryInfo) notFound();

  const products = await getProductsByCategorySlug(params.category);

  return (
    <section className="min-h-screen bg-[#1A1A2E] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/shop" className="inline-flex items-center gap-2 text-white/50 hover:text-[#00A699] mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-2">{categoryInfo.name}</h1>
        <p className="text-white/50 mb-12">{products.length} products</p>

        {products.length === 0 ? (
          <p className="text-white/40">No products found in this category right now.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {products.map((p) => (
              <a key={p.id}
                href={p.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#16213E] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00A699]/40 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-white/5">
                  {p.images?.[0]?.src ? (
                    <Image
                      src={p.images[0].src}
                      alt={p.images[0].alt || p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">No image</div>
                  )}
                  {p.on_sale && (
                    <span className="absolute top-3 left-3 bg-[#FF5A5F] text-white text-xs font-bold px-2 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{p.name}</h3>
                  {p.rating_count > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-white/50 text-xs">{p.average_rating} ({p.rating_count})</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF5A5F] font-bold">${p.price}</span>
                    {p.on_sale && (
                      <span className="text-white/30 text-xs line-through">${p.regular_price}</span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}