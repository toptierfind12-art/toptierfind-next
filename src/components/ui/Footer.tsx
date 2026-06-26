import Link from 'next/link';
import { Zap, Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  Quizzes: [
    { label: 'Weight Loss', href: '/quiz/weight-loss' },
    { label: 'Home Fitness', href: '/quiz/fitness' },
    { label: 'Keto & Diet', href: '/quiz/keto' },
    { label: 'Skincare', href: '/quiz/skincare' },
    { label: 'Better Sleep', href: '/quiz/sleep' },
    { label: 'All Quizzes', href: '/find-my-match' },
  ],
  Shop: [
    { label: 'Fitness Gear', href: '/shop/fitness-gear' },
    { label: 'Wellness', href: '/shop/wellness' },
    { label: 'Kitchen & Diet', href: '/shop/kitchen' },
    { label: 'Beauty', href: '/shop/beauty' },
    { label: 'Tech & Gadgets', href: '/shop/tech' },
    { label: 'Lifestyle', href: '/shop/lifestyle' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Affiliate Disclosure', href: '/disclosure' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0F1B2D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF5A5F] flex items-center justify-center">
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="font-bold text-lg text-white">
                Top<span className="text-[#FF5A5F]">Tier</span>Find
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Helping you discover products that actually work — through personalized quizzes and real community reviews.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/toptierfind"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-[#FF5A5F] rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={15} className="text-white/60" />
              </a>
              <a
                href="https://instagram.com/toptierfind"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-[#FF5A5F] rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={15} className="text-white/60" />
              </a>
              <a
                href="https://twitter.com/toptierfind"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-[#FF5A5F] rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={15} className="text-white/60" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-[#00A699] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} TopTierFind. All rights reserved.
          </p>
          <p className="text-white/20 text-xs text-center md:text-right max-w-md">
            TopTierFind is a participant in affiliate programs. We may earn a commission on qualifying purchases at no cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
