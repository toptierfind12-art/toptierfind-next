'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { shopCategories } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

interface Props {
  thumbnails: Record<string, string>;
}

export default function ShopCategories({ thumbnails }: Props) {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-[#00A699] text-xs font-semibold uppercase tracking-widest mb-3 block">
              Our Shop
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Browse by{' '}
              <span className="text-[#FF5A5F]">Category</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-white/50 hover:text-[#00A699] font-medium transition-colors duration-200 group"
          >
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* 6-Category Grid — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {shopCategories.map((cat, i) => {
            const isLarge = i < 2;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={isLarge ? 'md:col-span-6' : 'md:col-span-4'}
              >
                <Link
                  href={cat.href}
                  className="group block relative overflow-hidden rounded-2xl cursor-pointer"
                  style={{ height: isLarge ? '320px' : '220px' }}
                >
                  {/* BG Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${thumbnails[cat.id] || cat.image})` }}
                  />
                  {/* Dark overlay always */}
                  <div className="absolute inset-0 bg-[#1A1A2E]/60" />
                  {/* Teal overlay on hover */}
                  <div className="absolute inset-0 bg-[#00A699]/0 group-hover:bg-[#00A699]/25 transition-all duration-400" />
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#1A1A2E] to-transparent" />
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/50 text-xs mb-1">{cat.itemCount}</p>
                        <h3 className="text-white font-bold text-xl md:text-2xl mb-1">{cat.title}</h3>
                        <p className="text-white/60 text-sm">{cat.description}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#FF5A5F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex-shrink-0 ml-4">
                        <ArrowRight size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}