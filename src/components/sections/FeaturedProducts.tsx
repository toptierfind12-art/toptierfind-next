'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { featuredProducts } from '@/lib/data';
import { Star, ShoppingCart } from 'lucide-react';

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-[#FF5A5F]',
  'Hot Deal': 'bg-orange-500',
  'Top Rated': 'bg-[#00A699]',
  'New': 'bg-purple-500',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
        />
      ))}
      <span className="text-white/50 text-xs ml-1">{rating}</span>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-[#16213E]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#FF5A5F] text-xs font-semibold uppercase tracking-widest mb-3 block">
            Hand-Picked For You
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Featured{' '}
            <span className="text-[#00A699]">Products</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Top-rated items our community loves most this month.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="group bg-[#0F3460] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00A699]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/30">
                {/* Image */}
                <div className="relative overflow-hidden h-52 bg-[#1A1A2E]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`${badgeColors[product.badge] || 'bg-[#FF5A5F]'} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 leading-tight">
                    {product.title}
                  </h3>

                  <StarRating rating={product.rating} />
                  <p className="text-white/30 text-xs mt-1 mb-3">{product.reviews.toLocaleString()} reviews</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#FF5A5F] font-bold text-lg">{product.price}</span>
                      <span className="text-white/30 text-sm line-through ml-2">{product.originalPrice}</span>
                    </div>
                    <Link
                      href={product.href}
                      className="w-9 h-9 bg-[#FF5A5F] hover:bg-[#00A699] rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <ShoppingCart size={14} className="text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-transparent border border-white/20 hover:border-[#FF5A5F] text-white/70 hover:text-[#FF5A5F] font-semibold px-8 py-3.5 rounded-full transition-all duration-200"
          >
            View All Products →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
