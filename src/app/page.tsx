'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-dark overflow-hidden">
      {/* Geometric Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-lg backdrop-blur-glass-lg border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-serif font-bold text-gradient"
          >
            Dr. Cenik
          </motion.div>

          <div className="hidden md:flex gap-8">
            {['Therapies', 'R-Force', 'FAQ', 'Über uns', 'Kontakt'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-gray-300 hover:text-gold-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-300 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-button hidden md:block"
          >
            Termin buchen
          </motion.button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-gold-400 font-serif text-lg">Willkommen zu</p>
              <h1 className="hero-title">
                Dr. Fadime Cenik
              </h1>
              <p className="text-gold-400 font-serif text-2xl font-light">
                Fachärztin für Physikalische Medizin & Rehabilitation
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg leading-relaxed max-w-md"
            >
              Spezialisierte Therapien mit modernen Technologien. Ihre Gesundheit und Wohlbefinden stehen im Mittelpunkt unserer Praxis.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 pt-4"
            >
              <button className="glass-button">
                Termin buchen
              </button>
              <button className="glass-button-secondary">
                Mehr erfahren
              </button>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-8"
            >
              {[
                { icon: '📞', label: '01 / 769 29 91', value: 'Anrufen' },
                { icon: '📧', label: 'info@drcenik.at', value: 'Email' },
              ].map((item, i) => (
                <div key={i} className="glass-card">
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="text-xs text-gray-400">{item.value}</p>
                  <p className="text-sm text-gold-400 font-semibold">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Floating Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 md:h-full flex items-center justify-center"
          >
            {/* Floating Hexagons */}
            {[
              { delay: 0, size: 'w-32 h-32', top: '10%', left: '10%' },
              { delay: 0.2, size: 'w-24 h-24', top: '50%', left: '70%' },
              { delay: 0.4, size: 'w-28 h-28', top: '70%', left: '20%' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: item.delay }}
                className={`absolute ${item.size} hexagon glass border-2 border-gold-500/30 flex items-center justify-center`}
                style={{ top: item.top, left: item.left }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl">
                    {['🏥', '💪', '🧘'][i]}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Central Glow */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-500/20 to-teal-500/20 blur-3xl"
            ></motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section id="therapies" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">Unsere Leistungen</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Spezialisierte Therapien für Ihre Gesundheit und Wohlbefinden
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Massagetherapien', desc: 'Therapeutische Massagen', icon: '💆' },
              { title: 'Heilgymnastik', desc: 'Bewegungstherapie', icon: '🏃' },
              { title: 'Elektrotherapie', desc: 'Moderne Technologie', icon: '⚡' },
              { title: 'R-Force', desc: 'Revolutionäre Therapie', icon: '🚀' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 0 40px rgba(201, 169, 97, 0.5)' }}
                className="glass-card group cursor-pointer"
              >
                <p className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </p>
                <h3 className="text-xl font-serif font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-lg p-12 text-center"
          >
            <h2 className="section-title mb-4">Bereit für Ihre Gesundheit?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie noch heute einen Termin und starten Sie Ihren Weg zu besserer Gesundheit.
            </p>
            <button className="glass-button text-lg px-8 py-4">
              Jetzt Termin buchen
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-gold-400 font-serif font-semibold mb-4">Dr. Cenik</h3>
              <p className="text-gray-400 text-sm">Fachärztin für Physikalische Medizin & Rehabilitation</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-gold-400 transition-colors">Therapies</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">R-Force</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontakt</h4>
              <p className="text-gray-400 text-sm">📞 01 / 769 29 91</p>
              <p className="text-gray-400 text-sm">📧 info@drcenik.at</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Adresse</h4>
              <p className="text-gray-400 text-sm">Kaiser-Ebersdorfer-Straße 328</p>
              <p className="text-gray-400 text-sm">1110 Wien, Austria</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Dr. Fadime Cenik. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
