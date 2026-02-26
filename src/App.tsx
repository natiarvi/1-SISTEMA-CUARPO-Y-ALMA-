/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Star, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Heart, 
  Eye, 
  Utensils, 
  Zap,
  Lock
} from 'lucide-react';

// Assets mapping based on provided images
const ASSETS = {
  hero: 'input_file_0.png',
  mainBook: 'https://i.imgur.com/RRc8GZF.jpeg',
  bonus1: 'https://i.imgur.com/YwwA0CU.png',
  bonus2: 'https://i.imgur.com/VbMWled.png',
  deliverableNutrir: 'https://i.imgur.com/HwffaSd.png',
  bonus3: 'https://i.imgur.com/oqlT0gH.png',
  deliverablePortales: 'https://i.imgur.com/ZHU1MUl.png',
  deliverableCarta: 'https://i.imgur.com/wi2RDZz.png',
  deliverableMantras: 'https://i.imgur.com/z6nYwkx.png',
  // Versions for bonuses
  bonus1Alt: 'https://i.imgur.com/YwwA0CU.png',
  bonus2Alt: 'https://i.imgur.com/VbMWled.png',
  bonus3Alt: 'https://i.imgur.com/oqlT0gH.png',
};

const CountdownTimer = ({ hours }: { hours: number }) => {
  const [timeLeft, setTimeLeft] = React.useState(hours * 3600);

  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return (
    <div className="mt-8 flex gap-4 text-center">
      {[
        { label: 'Horas', value: h },
        { label: 'Minutos', value: m },
        { label: 'Segundos', value: s },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold backdrop-blur-sm">
            {String(item.value).padStart(2, '0')}
          </div>
          <span className="mt-2 text-[10px] uppercase tracking-widest opacity-60">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-purp-light/20 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-purp-deep">{question}</span>
        {isOpen ? <ChevronUp className="text-purp-light" /> : <ChevronDown className="text-purp-light" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-text-gray/80 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTAButton = ({ text, subtext }: { text: string; subtext?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex flex-col items-center gap-4"
  >
    <a 
      href="https://pay.hotmart.com/F104610959N?checkoutMode=10"
      target="_blank"
      rel="noopener noreferrer"
      className="gradient-rose-purp shadow-purp flex w-full max-w-md items-center justify-center rounded-full px-8 py-5 text-center text-xl font-bold text-white transition-all hover:opacity-90 md:text-2xl"
    >
      {text}
    </a>
    {subtext && <p className="text-sm text-text-gray/60 italic">{subtext}</p>}
    <div className="flex items-center gap-4 opacity-60">
      <div className="flex items-center gap-1 text-xs">
        <Lock size={14} /> Pago Seguro
      </div>
      <div className="flex items-center gap-1 text-xs">
        <ShieldCheck size={14} /> Garantía de 7 días
      </div>
    </div>
  </motion.div>
);

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-white/95 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur-md md:px-12"
        >
          <div className="hidden md:block">
            <p className="font-bold text-purp-deep">Sistema Cuerpo & Alma™</p>
            <p className="text-xs text-text-gray/60">Transformación completa en 30 días</p>
          </div>
          <div className="flex w-full items-center justify-between gap-4 md:w-auto">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-purp-light">Oferta Especial</span>
              <span className="text-2xl font-black text-purp-deep">$12.99</span>
            </div>
            <a
              href="https://pay.hotmart.com/F104610959N?checkoutMode=10"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-rose-purp rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              ¡QUIERO EMPEZAR YA!
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <StickyCTA />
      <section className="gradient-purp relative overflow-hidden px-6 py-20 text-white md:py-32">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={ASSETS.hero} 
            alt="Background" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold leading-tight md:text-6xl"
          >
            ¿Tu Cuerpo y Tu Alma Están Pidiendo a Gritos Reconectarse?
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl italic text-white/90 md:text-2xl"
          >
            Descubre el Sistema Cuerpo & Alma™ que está Transformando la Vida de Miles de Mujeres en Solo 30 Días
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <CTAButton text="QUIERO EL SISTEMA COMPLETO" />
          </motion.div>
        </div>
      </section>

      {/* 2. SUBTITLE */}
      <section className="bg-white px-6 py-12 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-lg italic text-text-gray/80 md:text-xl">
            Si sientes que vives en "piloto automático", desconectada de tu esencia y con una relación conflictiva con tu cuerpo y la comida... este mensaje es para ti.
          </p>
        </div>
      </section>

      {/* 3. INTRODUCTION / HISTORY */}
      <section className="bg-beige-cream px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <div className="space-y-6 text-lg leading-relaxed text-text-gray">
            <p className="font-serif text-2xl italic text-purp-deep">Querida alma en búsqueda,</p>
            <p>
              ¿Te has despertado alguna vez sintiéndote como una extraña en tu propio cuerpo? ¿Como si existieran en dos mundos separados: uno físico que no entiendes, y uno espiritual al que no puedes acceder?
            </p>
            <p>
              Yo sé exactamente cómo se siente esa desconexión porque la viví durante años...
            </p>
            <p>
              Tenía "todo" - una vida que desde afuera parecía perfecta. Pero por dentro, algo gritaba pidiendo atención. Mi cuerpo me enviaba señales de que yo ignoraba. Mi alma susurraba verdades que yo no sabía escuchar.
            </p>
            <p className="font-bold text-purp-deep">
              Hasta que descubrí algo que lo cambió todo: tu cuerpo tiene algo que decirte.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 4. UVP */}
      <section className="gradient-purp px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div 
            whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
            className="rounded-3xl bg-white p-8 text-center md:p-12"
          >
            <h2 className="text-3xl font-bold text-purp-deep md:text-4xl">El Sistema Cuerpo & Alma™</h2>
            <h3 className="mt-4 text-xl font-semibold text-purp-light">La Única Metodología que Integra Alimentación Consciente con Despertar Espiritual</h3>
            <div className="mx-auto mt-8 h-1 w-20 bg-gold-subtle"></div>
            <p className="mt-8 text-lg text-text-gray/80">
              No es solo otro programa de bienestar. Es un sistema completo que transforma tu relación contigo misma desde la raíz, usando los 5 sentidos como portales de presencia y rituales diarios que despiertan tu conexión sagrada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. BENEFITS */}
      <section className="bg-beige-cream px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-purp-deep md:text-4xl">✨ Lo Que Vas a Experimentar:</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: <Sparkles className="text-gold-subtle" />, title: "Conexión Auténtica", desc: "Tu cuerpo y alma funcionando como UNA unidad sagrada" },
              { icon: <Utensils className="text-gold-subtle" />, title: "Alimentación Consciente", desc: "Relación amorosa y saludable con la comida (sin dietas restrictivas)" },
              { icon: <Clock className="text-gold-subtle" />, title: "Presencia Genuina", desc: "Práctica diaria establecida en solo 15-20 minutos" },
              { icon: <Zap className="text-gold-subtle" />, title: "Claridad de Propósito", desc: "Dirección clara sobre tu misión de vida" },
              { icon: <Heart className="text-gold-subtle" />, title: "Paz Interior Real", desc: "No superficial, sino esa sensación de estar 'en casa' contigo misma" },
              { icon: <BookOpen className="text-gold-subtle" />, title: "Ritual Sagrado Diario", desc: "Transformar lo cotidiano en experiencia espiritual" },
              { icon: <Eye className="text-gold-subtle" />, title: "Escucha Profunda", desc: "Decodificar las señales que tu cuerpo te envía constantemente" },
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="card-shadow flex items-start gap-4 rounded-2xl bg-white p-6"
              >
                <div className="mt-1">{benefit.icon}</div>
                <div>
                  <h4 className="font-bold text-purp-deep">{benefit.title}</h4>
                  <p className="text-sm text-text-gray/70">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF */}
      <section className="bg-purp-light/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-purp-deep md:text-4xl">💫 Lo Que Dicen Nuestras Alumnas:</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "María Elena", age: 34, country: "México", text: "En 3 semanas dejé de pelear con mi cuerpo y comencé a amarlo. El cambio fue tan profundo que mi familia lo notó inmediatamente.", img: "https://picsum.photos/seed/maria/100/100" },
              { name: "Carmen", age: 41, country: "España", text: "Por primera vez en años, siento que mi cuerpo y mi alma hablan el mismo idioma. Los rituales diarios se volvieron mi momento sagrado favorito.", img: "https://picsum.photos/seed/carmen/100/100" },
              { name: "Ana Sofía", age: 29, country: "Colombia", text: "Pensé que necesitaría terapia cara y años de trabajo. En 30 días logré más conexión conmigo misma que en años de búsqueda.", img: "https://picsum.photos/seed/ana/100/100" },
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-shadow rounded-2xl border-l-4 border-purp-light bg-white p-8"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#D4AF37" className="text-gold-subtle" />)}
                </div>
                <p className="mb-6 italic text-text-gray/80">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.img} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full object-cover border-2 border-purp-light/20" 
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-sm font-bold text-purp-deep">— {testimonial.name}</p>
                    <p className="text-[10px] text-text-gray/60">{testimonial.age} años, {testimonial.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-center font-semibold text-purp-deep/60">
            [Más de 3,847 mujeres han transformado su vida con este sistema]
          </p>
        </div>
      </section>

      {/* 7. GUARANTEE */}
      <section className="bg-beige-cream px-6 py-24 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-[2rem] bg-white p-12 shadow-2xl border border-gold-subtle/20"
        >
          <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-gold-subtle to-gold-subtle/50 p-1 shadow-xl">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <ShieldCheck size={56} className="text-gold-subtle" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-purp-deep md:text-4xl">Garantía "Conexión Total" de 7 Días</h2>
          <p className="mt-8 text-xl leading-relaxed text-text-gray/80">
            Si en los primeros 7 días no sientes una conexión más profunda contigo misma, te devuelvo cada centavo. <span className="font-bold text-purp-deep">Sin preguntas, sin complicaciones, sin resentimientos.</span>
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="h-px w-20 bg-gold-subtle/30"></div>
            <p className="font-serif text-2xl italic text-purp-light">
              "Es mi compromiso personal contigo porque sé que este sistema funciona."
            </p>
            <p className="text-sm font-bold uppercase tracking-widest text-text-gray/40">— Vioalma</p>
          </div>
        </motion.div>
      </section>

      {/* 8. NOT FOR YOU IF */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border-2 border-dashed border-red-100 bg-red-50/30 p-8 md:p-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-red-800">⚠️ Este Sistema NO es Para Ti Si:</h2>
          <ul className="space-y-4 text-text-gray/80">
            <li className="flex items-start gap-3">
              <XCircle className="mt-1 shrink-0 text-red-500" size={20} />
              <span>Busca una "solución mágica" sin compromiso personal</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="mt-1 shrink-0 text-red-500" size={20} />
              <span>No estás dispuesto a dedicar 15-20 minutos diarios a tu transformación</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="mt-1 shrink-0 text-red-500" size={20} />
              <span>Prefieres mantener tu zona de comodidad antes de crecer</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="mt-1 shrink-0 text-red-500" size={20} />
              <span>Buscas solo cambios superficiales o estéticos</span>
            </li>
          </ul>
          <p className="mt-8 text-center text-sm italic">
            Este es un trabajo profundo de reconexión. Requiere presencia y compromiso amoroso contigo misma.
          </p>
        </div>
      </section>

      {/* 9. DELIVERABLES */}
      <section className="gradient-purp px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">Sistema Completo de Transformación Cuerpo & Alma:</h2>
          
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Libro Principal: 'Cuerpo & Alma'", desc: "La guía maestra con el sistema completo de transformación paso a paso.", img: ASSETS.mainBook },
              { title: "'Presencia en 5 Minutos'", desc: "Manual de meditaciones para el despertar (perfectas para tu rutina ocupada)", img: ASSETS.bonus1 },
              { title: "'Los 8 Pilares del Ser Consciente'", desc: "Los fundamentos sólidos para construir tu nueva relación contigo misma", img: ASSETS.bonus2 },
              { title: "'Mantras Cuerpo & Alma'", desc: "50 decretos de transformación para reprogramar tu diálogo interno", img: ASSETS.deliverableMantras },
              { title: "'El Arte Sagrado de Nutrir tu Templo'", desc: "Alimentación consciente sin restricciones ni culpas", img: ASSETS.deliverableNutrir },
              { title: "'Mi Diario de Alquimia Personal'", desc: "Tu compañero íntimo para documentar y acelerar tu transformación.", img: ASSETS.bonus3 },
              { title: "'Los 5 Portales: Despertar a través de los Sentidos'", desc: "Técnicas avanzadas para usar tus sentidos como puertas de presencia.", img: ASSETS.deliverablePortales },
              { title: "'Carta de Amor a Mi Cuerpo'", desc: "El perdón que sana y transforma tu relación corporal para siempre.", img: ASSETS.deliverableCarta },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="flex flex-col overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm"
              >
                <img src={item.img} alt={item.title} className="h-64 w-full object-cover" referrerPolicy="no-referrer" />
                <div className="p-6">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="mt-2 text-sm text-white/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BONUSES */}
      <section className="bg-beige-cream px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-purp-deep md:text-4xl">🎁 Bonos Exclusivos (Valor: $97)</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { id: 1, title: "Guía 'Presencia en 5 Minutos'", value: 27, img: ASSETS.bonus1Alt, desc: "Porque sabemos que 'no tienes tiempo' - estas meditaciones caben en cualquier rutina" },
              { id: 2, title: "'Los 8 Pilares del Ser Consciente'", value: 37, img: ASSETS.bonus2Alt, desc: "Para que nunca te preguntes '¿por dónde empezar?' - tu hoja de ruta clara está aquí" },
              { id: 3, title: "'Mi Diario de Alquimia Personal'", value: 33, img: ASSETS.bonus3Alt, desc: "Tu seguimiento personal estructurado - nunca más transformación sin dirección" },
            ].map((bonus) => (
              <motion.div 
                key={bonus.id}
                className="card-shadow overflow-hidden rounded-2xl bg-white"
              >
                <div className="relative">
                  <img src={bonus.img} alt={bonus.title} className="h-48 w-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 rounded-full bg-purp-deep px-3 py-1 text-xs font-bold text-white">
                    GRATIS
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-purp-deep">BONO #{bonus.id}: {bonus.title}</h4>
                  <p className="mt-2 text-xs font-semibold text-text-gray/40 line-through">Valor: ${bonus.value}</p>
                  <p className="mt-4 text-sm text-text-gray/70">{bonus.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. VALUE ANCHOR */}
      <section className="bg-purp-deep px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">💰 El Valor Real de Tu Transformación</h2>
          <p className="mb-12 text-xl italic opacity-80">Si lo buscaras por separado pagarías...</p>
          <div className="space-y-4 text-left text-lg opacity-80">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Libro "Cuerpo & Alma"</span>
              <span className="line-through">$100</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>3 Bonos incluidos</span>
              <span className="line-through">$97</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Guía digital: "Mantras Cuerpo & Alma: 50 Decretos de Transformación"</span>
              <span className="line-through">$30</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Libro digital: "El Arte Sagrado de Nutrir tu Templo"</span>
              <span className="line-through">$30</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Guía digital: "Mi Diario de Alquimia Personal"</span>
              <span className="line-through">$30</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Libro digital: "Los 5 Portales: Despertar a través de los Sentidos"</span>
              <span className="line-through">$30</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Guía digital: "Carta de Amor a Mi Cuerpo: El Perdón que Sana"</span>
              <span className="line-through">$30</span>
            </div>
            <div className="flex justify-between pt-4 text-xl font-bold">
              <span>Total que invertirías</span>
              <span className="line-through">$347</span>
            </div>
          </div>
          
          <div className="mt-16 flex flex-col items-center">
            <p className="text-xl italic opacity-90">Pero hoy, por ser parte de esta comunidad especial...</p>
            <CountdownTimer hours={23} />
            <div className="mt-10 flex flex-col items-center justify-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-subtle">Tu inversión es solo</p>
              <p className="text-7xl font-black text-white md:text-8xl">$12.99</p>
            </div>
            <p className="mt-8 text-lg italic text-white/70">
              *Por menos de lo que gastas en un almuerzo, tienes acceso a un sistema completo de transformación personal que cambiará tu vida para siempre.*
            </p>
          </div>
        </div>
      </section>

      {/* 12. CTA #1 */}
      <section className="bg-white px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold text-purp-deep">🚀 ¡SÍ, QUIERO TRANSFORMAR MI VIDA HOY!</h2>
          <CTAButton 
            text="ACCEDER AL SISTEMA CUERPO & ALMA - $12.99" 
            subtext="Acceso inmediato a todos los materiales"
          />
          <div className="mt-12 grid grid-cols-2 gap-4 text-left text-sm font-semibold text-text-gray/70 md:grid-cols-4">
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purp-light" /> Acceso inmediato</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purp-light" /> Garantía de 7 días</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purp-light" /> Bonos incluidos</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purp-light" /> Descarga directa</div>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="bg-beige-cream px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-purp-deep md:text-4xl">❓ Preguntas frecuentes</h2>
          <div className="space-y-2">
            <FAQItem 
              question="¿Cuánto tiempo necesito dedicar diariamente?" 
              answer="Solo 15-20 minutos. El sistema está diseñado para mujeres ocupadas como tú." 
            />
            <FAQItem 
              question="¿Es solo teoría o incluye práctica?" 
              answer="Es 70% práctica. Incluye rituales diarios, ejercicios específicos y herramientas aplicables inmediatamente." 
            />
            <FAQItem 
              question="¿Funciona si nunca he meditado?" 
              answer="¡Absolutamente! Está diseñado especialmente para principiantes. Te guio paso a paso." 
            />
            <FAQItem 
              question="¿Qué pasa si no veo resultados?" 
              answer="Tienes 7 días de garantía total. Si no sientes una conexión más profunda, te devuelvo tu dinero." 
            />
            <FAQItem 
              question="¿Los materiales se quedan conmigo para siempre?" 
              answer="Sí, son tuyos de por vida. Puedes acceder cuando quieras, las veces que quieras." 
            />
            <FAQItem 
              question="¿Necesito cambiar mi alimentación distribuida?" 
              answer="No. Se trata de alimentación CONSCIENTE, no de dietas restrictivas. Viene con amor y presencia." 
            />
          </div>
        </div>
      </section>

      {/* 14. URGENCY */}
      <section className="bg-purp-light/5 px-6 py-12 text-center">
        <div className="mx-auto max-w-2xl rounded-2xl border border-purp-light/20 bg-white p-8">
          <div className="mb-4 flex items-center justify-center gap-2 text-purp-deep">
            <Clock size={24} />
            <h2 className="text-xl font-bold uppercase tracking-widest">Solo Disponible por Tiempo Limitado</h2>
          </div>
          <p className="text-text-gray/80">
            Esta oferta especial de <span className="font-bold text-purp-deep">$12.99</span> es parte de nuestro lanzamiento exclusivo. Después del lanzamiento, el Sistema Cuerpo & Alma volverá a su precio regular de <span className="font-bold">$347</span>.
          </p>
          <p className="mt-4 font-serif text-xl italic text-purp-light">No esperes. Tu alma ya esperaba suficiente.</p>
        </div>
      </section>

      {/* 15. CTA #2 */}
      <section className="bg-white px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold text-purp-deep">💫 Tu Transformación Te Está Esperando</h2>
          <CTAButton 
            text="SÍ, ESTOY LISTA PARA RECONECTARME - $12.99" 
            subtext="Tu cuerpo tiene algo que decirte. ¿Estás lista para escuchar?"
          />
        </div>
      </section>

      {/* 16. DEEP DIVE */}
      <section className="bg-beige-cream px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-12 text-3xl font-bold text-purp-deep md:text-4xl">🌊 La Verdad Sobre la Desconexión Cuerpo-Alma</h2>
          <div className="space-y-8 text-lg leading-relaxed text-text-gray/90">
            <p>La mayoría de las mujeres vivimos fragmentadas:</p>
            <ul className="mx-auto max-w-md space-y-2 text-left italic">
              <li>• Nuestro cuerpo por un lado (dietas, ejercicio, apariencia)</li>
              <li>• Nuestra alma por otro (espiritualidad, propósito, crecimiento)</li>
            </ul>
            <p className="text-xl font-bold text-purp-deep">Pero la verdad es que somos UNA unidad sagrada.</p>
            <p>
              Tu cuerpo NO es tu enemigo. Es tu templo, tu guía, tu sabiduría ancestral hecha carne.
            </p>
            <p>
              Tu alma NO está "ahí arriba". Vive en cada célula, en cada respiración, en cada latido.
            </p>
            <p className="font-semibold text-purp-light">
              El Sistema Cuerpo & Alma™ te enseña a vivir esta integración.
            </p>
            <p>
              No más guerra interna. No más vacío espiritual. No más piloto automático.
            </p>
            <p className="text-2xl font-serif italic text-purp-deep">Solo TÚ, completa, consciente, en paz.</p>
          </div>
        </div>
      </section>

      {/* 17. FINAL CTA + CLOSURE */}
      <section className="gradient-purp relative overflow-hidden px-6 py-24 text-white">
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold md:text-5xl">🌅 Tu Nueva Vida Comienza Ahora</h2>
          <div className="mb-16 space-y-6 text-xl opacity-90">
            <p>Imagínate dentro de 30 días:</p>
            <ul className="space-y-4">
              <li>Despiertas y lo primero que sientes es <span className="font-bold">gratitud por tu cuerpo</span>.</li>
              <li>Vives con <span className="font-bold">presencia y amor</span>, sin culpa ni conflicto.</li>
              <li>Tus decisiones fluyen desde una <span className="font-bold">sabiduría interior</span> que nunca habías escuchado.</li>
              <li>Tu día tiene <span className="font-bold">ritual y propósito</span>, no solo tareas.</li>
              <li>Te miras al espejo y ves a una <span className="font-bold">mujer completa</span>, conectada, en paz.</li>
            </ul>
            <p className="mt-8 font-serif text-2xl italic">Esta no es fantasía. Es tu derecho de nacimiento.</p>
          </div>
          
          <CTAButton 
            text="SÍ, RECLAMO MI DERECHO A ESTAR COMPLETA - $12.99" 
          />
          
          <div className="mt-20">
            <p className="font-serif text-2xl italic">Con amor infinito hacia tu despertar,</p>
            <p className="mt-2 text-3xl font-bold">Vioalma 💜</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-purp-deep py-8 text-center text-xs text-white/40">
        <p>© {new Date().getFullYear()} Cuerpo & Alma. Todos los derechos reservados.</p>
        <p className="mt-2">Diseñado con amor para tu despertar espiritual.</p>
      </footer>
    </div>
  );
}
