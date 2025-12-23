
import React, { useState, useRef } from 'react';
import { 
  Star, 
  Check, 
  Truck, 
  ShieldCheck, 
  Crown, 
  Diamond, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Quote, 
  Zap,
  Palette,
  Layers,
  Camera,
  Loader2
} from 'lucide-react';
import { Edition } from './types';

// Paleta de Cores Exata Solicitada
const COLORS = {
  bg: '#0F0404', // Vinho quase preto
  gold: '#EBC85E', // Dourado vivo
  textMain: '#FFFFFF', // Branco
  textSecondary: '#D4C5C5', // Cinza rosado
  selection: '#EBC85E', // Dourado para bordas de seleção
};

const Header: React.FC = () => (
  <header className="pt-12 pb-8 px-4 text-center">
    <div className="mb-4">
      <div className="inline-block border border-[#EBC85E]/50 rounded-full px-4 py-1 mb-2">
        <span className="text-[#EBC85E] font-bold text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-2">
          <Star size={10} fill="#EBC85E" strokeWidth={0} /> Edição Imperial Original
        </span>
      </div>
    </div>
    <h1 className="font-serif-classic text-5xl md:text-7xl text-white uppercase tracking-tight mb-2 leading-tight">
      A Arte da Guerra
    </h1>
    <h2 className="text-[#EBC85E] font-sans text-xl md:text-2xl uppercase tracking-[0.4em] font-light">
      Sun Tzu
    </h2>
    <div className="mt-6 flex flex-col items-center gap-1">
      <div className="flex text-[#EBC85E] gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} fill="#EBC85E" strokeWidth={0} />
        ))}
      </div>
      <p className="text-[#D4C5C5] text-sm font-medium">
        (5.0) | +800 leitores satisfeitos
      </p>
    </div>
  </header>
);

const ProductShowcase: React.FC = () => {
  const [activeThumb, setActiveThumb] = useState(0);
  
  const images = [
    "https://i.imgur.com/Pn6iwLy.jpeg", // Capa Principal
    "https://i.imgur.com/7kjvBYr.jpeg", // Segunda Imagem
    "https://i.imgur.com/LVGWJQb.jpeg"  // Terceira Imagem
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">
      <div className="relative w-full aspect-[2/3] md:aspect-[3/4] rounded-lg shadow-[0_0_60px_rgba(235,200,94,0.15)] overflow-hidden bg-[#1a0808] border border-[#EBC85E]/20 flex items-center justify-center">
        <img 
          src={images[activeThumb]} 
          alt="Detalhes da Edição Garnier" 
          className="max-w-full max-h-full object-contain transition-all duration-500"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-3 w-full mt-6">
        {images.map((thumb, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveThumb(idx)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeThumb === idx ? 'border-[#EBC85E] scale-105 shadow-lg shadow-[#EBC85E]/20' : 'border-transparent opacity-50 hover:opacity-100'}`}
          >
            <img src={thumb} alt="Miniatura detalhe" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

const CheckoutSection: React.FC = () => {
  const [selected, setSelected] = useState<'deluxe' | 'ebook'>('deluxe');
  const [isPurchasing, setIsPurchasing] = useState(false);

  const editions: Edition[] = [
    {
      id: 'deluxe',
      title: 'Capa Dura de Luxo',
      price: 59.90,
      isPremium: true,
      tag: 'MELHOR ESCOLHA',
      checkoutUrl: 'https://www.ggcheckout.com/checkout/v3/PvNKVy7OHDGCnEclNVMU',
      benefits: [
        'Capa dura almofadada Garnier',
        'Hot-stamping dourado em relevo',
        'Corte tie-dye nas páginas',
        'Ilustrações coloridas históricas',
        'Marcador de páginas em cetim'
      ]
    },
    {
      id: 'ebook',
      title: 'Edição Digital (PDF)',
      price: 14.90,
      isPremium: false,
      checkoutUrl: 'https://www.ggcheckout.com/checkout/v2/b5ZTDrPaG9wkqHmu36OM',
      benefits: [
        'Envio imediato por e-mail',
        'Formato otimizado para Kindle/Pad',
        'Texto integral traduzido'
      ]
    }
  ];

  const handlePurchase = () => {
    setIsPurchasing(true);
    
    const selectedEdition = editions.find(e => e.id === selected);
    
    // Rastreamento do Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'AddToCart', {
        content_name: selectedEdition?.title,
        content_ids: [selectedEdition?.id],
        content_type: 'product',
        value: selectedEdition?.price,
        currency: 'BRL'
      });
    }

    // Delay curto para garantir o disparo do pixel e então redirecionar
    setTimeout(() => {
      if (selectedEdition?.checkoutUrl) {
        window.location.href = selectedEdition.checkoutUrl;
      }
      setIsPurchasing(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 mt-12 space-y-4">
      <h3 className="text-white text-xl font-bold mb-4 uppercase tracking-widest text-center lg:text-left">Selecione sua edição</h3>
      
      {editions.map((edition) => (
        <div 
          key={edition.id}
          onClick={() => setSelected(edition.id as any)}
          className={`relative cursor-pointer transition-all duration-300 rounded-xl p-6 border-2 flex flex-col ${
            selected === edition.id 
              ? 'bg-[#160808] border-[#EBC85E] shadow-[0_0_20px_rgba(235,200,94,0.1)]' 
              : 'bg-transparent border-white/10 opacity-60 hover:opacity-100'
          }`}
        >
          {edition.tag && (
            <span className="absolute -top-3 left-6 bg-[#EBC85E] text-black text-[9px] font-black px-4 py-1 rounded-sm uppercase tracking-widest">
              {edition.tag}
            </span>
          )}
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className={`text-xl font-bold ${edition.isPremium ? 'text-white' : 'text-[#D4C5C5]'}`}>
                {edition.title}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-[#EBC85E]">R$ {edition.price.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-all ${selected === edition.id ? 'border-[#EBC85E] bg-[#EBC85E]' : 'border-white/20'}`}>
              {selected === edition.id && <Check size={14} strokeWidth={4} className="text-black" />}
            </div>
          </div>
          
          <ul className="mt-4 grid grid-cols-1 gap-y-2">
            {edition.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[#D4C5C5]">
                <Check size={14} className="text-[#EBC85E]" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="pt-6 space-y-4">
        <button 
          onClick={handlePurchase}
          disabled={isPurchasing}
          className="w-full bg-[#EBC85E] hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 text-black font-black text-lg py-5 rounded-lg flex items-center justify-center gap-3 uppercase tracking-wider shadow-xl shadow-[#EBC85E]/20"
        >
          {isPurchasing ? (
            <>
              <Loader2 className="animate-spin" size={20} /> REDIRECIONANDO...
            </>
          ) : (
            <>
              <BookOpen size={20} /> COMPRAR AGORA - R$ {selected === 'deluxe' ? '59,90' : '14,90'}
            </>
          )}
        </button>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-white/5 bg-white/2 rounded-lg p-3 flex flex-col items-center text-center gap-1 group hover:border-[#EBC85E]/30 transition-colors">
            <ShieldCheck size={20} className="text-[#EBC85E]" />
            <span className="text-[9px] text-[#D4C5C5] font-bold uppercase tracking-tighter">Compra Segura</span>
          </div>
          <div className="border border-white/5 bg-white/2 rounded-lg p-3 flex flex-col items-center text-center gap-1 group hover:border-[#EBC85E]/30 transition-colors">
            <Truck size={20} className="text-[#EBC85E]" />
            <span className="text-[9px] text-[#D4C5C5] font-bold uppercase tracking-tighter">Entrega Rápida</span>
          </div>
          <div className="border border-white/5 bg-white/2 rounded-lg p-3 flex flex-col items-center text-center gap-1 group hover:border-[#EBC85E]/30 transition-colors">
            <Crown size={20} className="text-[#EBC85E]" />
            <span className="text-[9px] text-[#D4C5C5] font-bold uppercase tracking-tighter">Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const reviews = [
    { 
      name: "Maria S.", 
      text: "Chegou perfeito! A qualidade das ilustrações é de tirar o fôlego. O acabamento é muito superior.", 
      productImg: "https://i.imgur.com/MH3qeKm.jpeg" 
    },
    { 
      name: "João P.", 
      text: "Edição lindíssima, o dourado brilha muito sob a luz. Superou todas as expectativas de colecionador.", 
      productImg: "https://i.imgur.com/ZJ48B7B.jpeg" 
    },
    { 
      name: "Ana C.", 
      text: "O acabamento almofadado é sensacional. Melhor presente que já comprei para mim mesma.", 
      productImg: "https://i.imgur.com/n6Ow13y.jpeg" 
    },
    { 
      name: "Pedro L.", 
      text: "Livro robusto, tradução excelente e artes belíssimas. Recomendo para quem busca uma edição definitiva.", 
      productImg: "https://i.imgur.com/LVGWJQb.jpeg" 
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <div className="flex flex-col items-center mb-8">
        <div className="flex text-[#EBC85E] gap-1 mb-2">
          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#EBC85E" strokeWidth={0} />)}
        </div>
        <div className="flex items-center gap-3">
          <Quote size={20} className="text-[#EBC85E] opacity-50" />
          <h3 className="text-white text-2xl font-bold tracking-tight">Voz de quem já recebeu</h3>
        </div>
        <p className="text-[#D4C5C5]/60 text-xs mt-1 font-medium uppercase tracking-widest flex items-center gap-2">
          <Camera size={12} /> +800 Fotos de Clientes satisfeitos
        </p>
      </div>
      
      <div className="relative group px-1">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-[#EBC85E]/30 text-[#EBC85E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#EBC85E] hover:text-black shadow-lg backdrop-blur-sm hidden md:flex"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-[#EBC85E]/30 text-[#EBC85E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#EBC85E] hover:text-black shadow-lg backdrop-blur-sm hidden md:flex"
          aria-label="Próximo"
        >
          <ChevronRight size={20} />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-8 no-scrollbar snap-x scroll-smooth"
        >
          {reviews.map((review, i) => (
            <div key={i} className="min-w-[240px] md:min-w-[300px] snap-center bg-[#160808] border border-white/5 rounded-2xl overflow-hidden hover:border-[#EBC85E]/30 transition-all flex flex-col group/card shadow-xl">
              <div className="aspect-[16/10] w-full overflow-hidden bg-black/40">
                <img 
                  src={review.productImg} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                  alt={`Foto enviada por ${review.name}`} 
                />
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <p className="text-white font-bold text-sm">{review.name}</p>
                    <div className="flex text-[#EBC85E] gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="#EBC85E" strokeWidth={0} />)}
                    </div>
                  </div>
                  <Check size={14} className="text-green-500 bg-green-500/10 rounded-full p-0.5" />
                </div>
                
                <p className="text-[#D4C5C5] text-xs leading-relaxed mb-3 flex-1 line-clamp-3">
                  "{review.text}"
                </p>
                
                <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                   <span className="text-[9px] text-[#EBC85E] font-bold uppercase tracking-wider">Compra Verificada</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-1.5 mt-2 md:hidden">
          {reviews.map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#EBC85E]/30"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => (
  <section className="max-w-4xl mx-auto px-6 py-16">
    <div className="flex items-center gap-3 mb-8">
      <BookOpen className="text-[#EBC85E]" size={28} />
      <h3 className="text-white text-3xl font-bold tracking-tight">A Obra-Prima da Estratégia</h3>
    </div>
    
    <div className="space-y-8 text-[#D4C5C5] leading-relaxed text-base text-justify">
      <p>
        Escrito há mais de 2.500 anos, <span className="text-white font-bold">A Arte da Guerra</span> de Sun Tzu continua sendo a bíblia da estratégia. Esta edição da <span className="text-white">Editora Garnier</span> foi concebida para ser a versão definitiva em sua estante.
      </p>
      <p>
        Diferente das edições comuns, aqui cada capítulo ganha vida com <span className="text-[#EBC85E] font-semibold">ilustrações coloridas</span> de alta definição, retratando a essência do pensamento militar oriental: samurais, formações de batalha e a filosofia do poder.
      </p>
      <p>
        A capa vermelha com o <span className="text-white">Dragão Imperial</span> em dourado não é apenas estética; ela simboliza a força e a sabedoria contida em cada uma das 13 lições fundamentais para vencer qualquer conflito sem precisar lutar.
      </p>
      
      <div className="bg-[#160808] p-8 rounded-3xl border border-[#EBC85E]/20 shadow-inner">
        <h4 className="text-[#EBC85E] font-bold text-xl mb-4 flex items-center gap-2">
          <Palette size={24} /> Qualidade Gráfica Garnier
        </h4>
        <p className="text-[#D4C5C5] italic text-lg leading-relaxed">
          "Páginas em papel Ivory 90g, laterais decoradas e artes internas exclusivas que transformam a leitura em uma imersão histórica completa."
        </p>
      </div>
    </div>
  </section>
);

const PremiumFeatures: React.FC = () => {
  const features = [
    {
      icon: <Crown size={24} />,
      title: 'Capa Almofadada',
      description: 'Acabamento macio e resistente com toque de luxo imperial.'
    },
    {
      icon: <Diamond size={24} />,
      title: 'Destaque Dourado',
      description: 'Ouro em hot-stamping que realça a nobreza da edição.'
    },
    {
      icon: <Palette size={24} />,
      title: 'Páginas Ilustradas',
      description: 'Artes coloridas que ajudam a visualizar as táticas de Sun Tzu.'
    },
    {
      icon: <Layers size={24} />,
      title: 'Papel Premium',
      description: 'Papel de alta gramatura para uma durabilidade vitalícia.'
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 pb-24">
      <div className="flex items-center gap-3 mb-8">
        <Star className="text-[#EBC85E]" size={28} />
        <h3 className="text-white text-3xl font-bold tracking-tight">Detalhes Exclusivos</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="flex gap-5 p-6 rounded-2xl border border-white/5 bg-[#160808] hover:border-[#EBC85E]/30 transition-all group">
            <div className="w-14 h-14 rounded-xl bg-[#EBC85E]/10 flex items-center justify-center text-[#EBC85E] flex-shrink-0 transform group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">{feature.title}</h4>
              <p className="text-[#D4C5C5]/70 text-xs leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F0404] selection:bg-[#EBC85E] selection:text-black font-sans">
      <Header />
      
      <main>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 lg:max-w-6xl lg:mx-auto pt-8">
          <ProductShowcase />
          <CheckoutSection />
        </div>
        
        <Testimonials />
        
        <div className="bg-gradient-to-b from-transparent to-black/40">
          <AboutSection />
          <PremiumFeatures />
        </div>
      </main>
      
      <footer className="py-12 text-center border-t border-white/5 bg-black/60">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4">
          <div className="flex flex-col items-center gap-2">
            <Palette className="text-[#EBC85E]" size={32} />
            <h4 className="text-white font-bold uppercase text-xs tracking-widest">Artes Históricas</h4>
            <p className="text-[#D4C5C5]/60 text-xs">Ilustrações de samurais em cada capítulo.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Layers className="text-[#EBC85E]" size={32} />
            <h4 className="text-white font-bold uppercase text-xs tracking-widest">Papel Ivory 90g</h4>
            <p className="text-[#D4C5C5]/60 text-xs">Leitura confortável com toque de pergaminho.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BookOpen className="text-[#EBC85E]" size={32} />
            <h4 className="text-white font-bold uppercase text-xs tracking-widest">Texto Integral</h4>
            <p className="text-[#D4C5C5]/60 text-xs">A tradução mais respeitada do original.</p>
          </div>
        </div>
        <p className="text-[#D4C5C5]/20 text-[10px] tracking-[0.4em] uppercase font-bold">
          © 2024 Sun Tzu | A Arte da Guerra - Edição Garnier de Luxo
        </p>
      </footer>
    </div>
  );
};

export default App;
