'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="sticky-header px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold-500 rounded-full"></div>
          <span className="text-white font-serif text-xl">Dr. Cenik</span>
        </div>
        <nav className="hidden md:flex gap-8 text-white">
          <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <Link href="/therapies" className="hover:text-gold-400 transition-colors">Therapies</Link>
          <Link href="/r-force" className="hover:text-gold-400 transition-colors">R-Force</Link>
          <Link href="/faq" className="hover:text-gold-400 transition-colors">FAQ</Link>
          <Link href="/about" className="text-gold-400">About</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="hero-title mb-4">Über mich</h1>
          <p className="hero-subtitle">Meine Leidenschaft für Ihre Gesundheit</p>
        </motion.div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card"
          >
            <div className="w-full h-64 bg-gradient-to-br from-gold-500/20 to-teal-500/20 rounded-lg mb-6 flex items-center justify-center">
              <div className="text-6xl">👨‍⚕️</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-card">
              <h2 className="text-2xl font-serif text-gold-400 mb-4">Dr. Fadime Cenik</h2>
              <p className="text-gray-300 leading-relaxed">
                Fachärztin für Physikalische Medizin und Rehabilitation mit über 15 Jahren Erfahrung in der Behandlung von Patienten mit verschiedenen muskuloskelettalen und neurologischen Erkrankungen.
              </p>
            </div>

            <div className="glass-card">
              <h3 className="text-xl font-serif text-gold-400 mb-3">Qualifikationen</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Facharzt für Physikalische Medizin & Rehabilitation</li>
                <li>✓ Spezialisierung in R-Force Therapie</li>
                <li>✓ Kassenärztin ÖGK, SVB, BVAEB</li>
                <li>✓ Kontinuierliche Fortbildungen in modernen Therapiemethoden</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card mb-20 p-8"
        >
          <h2 className="section-title mb-6">Meine Philosophie</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-serif text-gold-400 mb-3">Patientenzentriert</h3>
              <p className="text-gray-300">Jeder Patient ist einzigartig. Ich entwickle individualisierte Behandlungspläne basierend auf Ihren spezifischen Bedürfnissen.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-lg font-serif text-gold-400 mb-3">Wissenschaftlich</h3>
              <p className="text-gray-300">Meine Behandlungen basieren auf neuesten wissenschaftlichen Erkenntnissen und bewährten medizinischen Praktiken.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-lg font-serif text-gold-400 mb-3">Ganzheitlich</h3>
              <p className="text-gray-300">Ich betrachte den ganzen Menschen - Körper, Geist und Seele - für optimale Heilungsergebnisse.</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="section-title mb-6">Bereit, Ihre Gesundheit zu verbessern?</h2>
          <button className="glass-button">Jetzt Termin buchen</button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gold-400 font-serif mb-4">Dr. Cenik</h3>
            <p className="text-gray-400 text-sm">Physikalische Medizin & Rehabilitation</p>
          </div>
          <div>
            <h3 className="text-gold-400 font-serif mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link href="/therapies" className="hover:text-gold-400 transition-colors">Therapies</Link></li>
              <li><Link href="/r-force" className="hover:text-gold-400 transition-colors">R-Force</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gold-400 font-serif mb-4">Kontakt</h3>
            <p className="text-gray-400 text-sm">01 / 769 29 91</p>
            <p className="text-gray-400 text-sm">info@drcenik.at</p>
          </div>
          <div>
            <h3 className="text-gold-400 font-serif mb-4">Adresse</h3>
            <p className="text-gray-400 text-sm">Kaiser-Ebersdorfer-Straße 328</p>
            <p className="text-gray-400 text-sm">1110 Vienna, Austria</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 Dr. Fadime Cenik. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </main>
  );
}
