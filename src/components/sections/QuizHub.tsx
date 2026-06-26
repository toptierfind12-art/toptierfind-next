'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { quizNiches } from '@/lib/data';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function QuizHub() {
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
            Personalized For You
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            What Are You Looking to{' '}
            <span className="text-[#00A699]">Improve?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Pick a category. Answer 3 quick questions. Get your top picks.
          </p>
        </motion.div>

        {/* 9-Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {quizNiches.map((niche, i) => (
            <motion.div key={niche.id} variants={cardVariants}>
              <Link href={niche.href} className="group block relative overflow-hidden rounded-2xl h-52 cursor-pointer">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${niche.image})` }}
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${niche.color}dd 0%, #1A1A2Ecc 100%)`,
                  }}
                />

                {/* Red overlay on hover */}
                <div className="absolute inset-0 bg-[#FF5A5F]/0 group-hover:bg-[#FF5A5F]/20 transition-all duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{niche.emoji}</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                      {niche.participants}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">{niche.title}</h3>
                    <p className="text-white/70 text-sm mb-3">{niche.subtitle}</p>
                    <div className="flex items-center gap-2 text-white text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      <span>Take Quiz</span>
                      <span className="text-[#00A699]">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Below Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/find-my-match"
            className="inline-flex items-center gap-2 border border-[#00A699]/40 hover:border-[#00A699] text-[#00A699] font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-[#00A699]/10"
          >
            Not Sure? Take the Master Quiz
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
