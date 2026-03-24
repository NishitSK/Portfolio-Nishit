'use client';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl tracking-tighter">NISHIT</span>
            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
        </div>

        <p className="font-sans text-xs uppercase tracking-widest opacity-40">
           © {new Date().getFullYear()} All Rights Reserved.
        </p>

        <div className="flex gap-6 font-sans text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-[var(--accent)] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">LinkedIn</a>
            <a href="https://github.com/NishitSK" className="hover:text-[var(--accent)] transition-colors">Github</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;