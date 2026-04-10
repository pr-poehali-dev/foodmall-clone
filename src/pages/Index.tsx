import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/61fd0b6c-5b47-4e24-b79a-cfff7711bb67/files/13433e16-0a25-4b07-be25-6db1abe5bad3.jpg";

const NAV_ITEMS = [
  { id: "about", label: "О нас" },
  { id: "clients", label: "Клиенты" },
  { id: "distribution", label: "Дистрибьюция" },
  { id: "cooperation", label: "Сотрудничество" },
  { id: "advantages", label: "Преимущества" },
];

const ABOUT_CARDS = [
  { icon: "Globe", title: "Мировые бренды", desc: "Эксклюзивные поставки от ведущих производителей из более чем 30 стран" },
  { icon: "TrendingUp", title: "Глобальный экспорт", desc: "Продвижение российских товаров на международные рынки" },
  { icon: "LayoutGrid", title: "Комплексный подход", desc: "Полный цикл — от поиска поставщика до доставки на полку" },
  { icon: "Award", title: "Лидеры рынка", desc: "Более 15 лет на рынке импорта и дистрибьюции продуктов питания" },
];

const CLIENTS = [
  { name: "Перекрёсток", category: "Федеральные сети" },
  { name: "Лента", category: "Федеральные сети" },
  { name: "Магнит", category: "Федеральные сети" },
  { name: "ВкусВилл", category: "Специализированная розница" },
  { name: "Азбука Вкуса", category: "Премиальная розница" },
  { name: "Metro C&C", category: "Оптовые сети" },
  { name: "Globus", category: "Гипермаркеты" },
  { name: "О'КЕЙ", category: "Федеральные сети" },
];

const DISTRIBUTION_ITEMS = [
  { icon: "MapPin", title: "Москва и МО", desc: "Собственная логистика и склады класса А в Подмосковье" },
  { icon: "Truck", title: "Регионы России", desc: "Доставка во все регионы РФ через партнёрскую сеть перевозчиков" },
  { icon: "Package", title: "Таможенное оформление", desc: "Полное сопровождение ВЭД — декларирование, сертификация, документация" },
  { icon: "Thermometer", title: "Температурная цепь", desc: "Хранение и доставка замороженных и охлаждённых продуктов" },
  { icon: "BarChart2", title: "Управление запасами", desc: "Современные WMS-системы и контроль товарных остатков в реальном времени" },
  { icon: "ShieldCheck", title: "Контроль качества", desc: "Лабораторный контроль и проверка каждой партии до поставки в сети" },
];

const STATS = [
  { num: "30+", label: "Стран-поставщиков" },
  { num: "500+", label: "Брендов в портфеле" },
  { num: "15", label: "Лет на рынке" },
  { num: "10 000+", label: "Точек продаж" },
];

function useScrollSpy() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const handler = () => {
      const offsets = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{ background: scrolled ? "#111816" : "transparent" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style2={scrolled ? { boxShadow: "0 2px 20px rgba(0,0,0,0.3)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "white", fontSize: "1.75rem", fontWeight: 600, letterSpacing: "0.15em" }}>
            ФУДМОЛЛ
          </span>
          <div style={{ width: 1, height: 24, background: "#c9a84c", opacity: 0.6, margin: "0 12px" }} className="hidden md:block" />
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.65rem", letterSpacing: "0.25em", fontFamily: "'Montserrat', sans-serif" }} className="hidden md:block">
            IMPORT & DISTRIBUTION
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: active === id ? "#c9a84c" : "rgba(255,255,255,0.75)",
                background: "none",
                border: "none",
                cursor: "pointer",
                paddingBottom: "4px",
                borderBottom: active === id ? "2px solid #c9a84c" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <button style={{ background: "none", border: "none", color: "white", cursor: "pointer" }} className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: "#111816", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 24px", color: "rgba(255,255,255,0.8)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default function Index() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", minHeight: "100vh" }}>
      <Navbar />

      {/* HERO */}
      <div style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(17,24,22,0.65) 0%, rgba(17,24,22,0.45) 60%, rgba(17,24,22,0.75) 100%)" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 800 }}>
          <p style={{ color: "#c9a84c", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>
            Импорт · Экспорт · Дистрибьюция
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: "white", fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 600, lineHeight: 1.1, marginBottom: 24 }}>
            ФУДМОЛЛ
          </h1>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 40px", fontWeight: 300 }}>
            Один из крупнейших импортёров продуктов питания — поставки высококачественных товаров от ведущих мировых производителей
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("about")} style={{ padding: "12px 32px", background: "#c9a84c", color: "#111816", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
              О компании
            </button>
            <button onClick={() => scrollTo("cooperation")} style={{ padding: "12px 32px", background: "transparent", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.5)", cursor: "pointer" }}>
              Сотрудничество
            </button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.4)", animation: "bounce 2s infinite" }}>
          <Icon name="ChevronDown" size={20} />
        </div>
      </div>

      {/* О НАС */}
      <section id="about" style={{ padding: "96px 0", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ width: 60, height: 3, background: "#c9a84c", marginBottom: 16 }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600, color: "#111816", marginBottom: 12 }}>О компании</h2>
          <p style={{ color: "#6b7280", fontWeight: 300, lineHeight: 1.7, maxWidth: 600, marginBottom: 48 }}>Ваш надёжный партнёр в мире международной торговли продуктами питания</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 64 }}>
            <div>
              <p style={{ color: "#4b5563", fontWeight: 300, lineHeight: 1.8, marginBottom: 20, fontSize: "0.95rem" }}>
                Компания <strong style={{ fontWeight: 600, color: "#1e5c3a" }}>ФУДМОЛЛ</strong> является одним из крупнейших импортёров продуктов питания и специализируется на поставках только высококачественных товаров от ведущих мировых производителей на территории Российской Федерации.
              </p>
              <p style={{ color: "#4b5563", fontWeight: 300, lineHeight: 1.8, fontSize: "0.95rem" }}>
                ФУДМОЛЛ занимается экспортом и реализацией популярных товаров местных производителей в различные страны мира и занимает роль надёжного и проверенного поставщика.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
              {STATS.map(({ num, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 20, borderBottom: "1px solid #f3f4f6", paddingBottom: 16 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1e5c3a", fontSize: "2.5rem", fontWeight: 600, width: 120, flexShrink: 0 }}>{num}</span>
                  <span style={{ color: "#9ca3af", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 80 }}>
            {ABOUT_CARDS.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "#f5f5f3", padding: 24, borderTop: "2px solid #1e5c3a", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
              >
                <div style={{ width: 40, height: 40, background: "#1e5c3a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon name={icon} fallback="Circle" size={18} className="text-white" />
                </div>
                <h3 style={{ fontWeight: 600, color: "#111816", fontSize: "0.95rem", marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div style={{ background: "#f5f5f3", padding: "48px" }}>
            <div style={{ width: 60, height: 3, background: "#c9a84c", marginBottom: 16 }} />
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "#111816", marginBottom: 8 }}>Свяжитесь с нами</h3>
            <p style={{ color: "#6b7280", fontWeight: 300, fontSize: "0.85rem", marginBottom: 32 }}>Оставьте заявку — мы свяжемся с вами в течение рабочего дня</p>
            <form style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 720 }}>
              <input type="text" placeholder="ФИО" style={{ padding: "12px 16px", border: "1px solid #e5e7eb", background: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", outline: "none" }} />
              <input type="text" placeholder="Компания" style={{ padding: "12px 16px", border: "1px solid #e5e7eb", background: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", outline: "none" }} />
              <input type="tel" placeholder="Телефон" style={{ padding: "12px 16px", border: "1px solid #e5e7eb", background: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", outline: "none" }} />
              <div style={{ gridColumn: "1 / -1" }}>
                <button type="submit" style={{ padding: "12px 32px", background: "#1e5c3a", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                  Отправить заявку
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* КЛИЕНТЫ */}
      <section id="clients" style={{ padding: "96px 0", background: "#111816" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ width: 60, height: 3, background: "#c9a84c", marginBottom: 16 }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600, color: "white", marginBottom: 12 }}>Клиенты</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300, lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}>
            Мы поставляем продукцию в ведущие торговые сети России и сотрудничаем с розничными игроками всех форматов
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 1, background: "rgba(255,255,255,0.1)" }}>
            {CLIENTS.map(({ name, category }) => (
              <div key={name} style={{ background: "#111816", padding: "28px 32px", transition: "background 0.2s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "#111816"}
              >
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>{category}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "white", fontSize: "1.4rem", fontWeight: 600 }}>{name}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 48, marginTop: 48, textAlign: "center" }}>
            {[["95%", "Повторных заказов"], ["200+", "Активных клиентов"], ["24/7", "Поддержка партнёров"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c", fontSize: "3rem", fontWeight: 600, marginBottom: 8 }}>{num}</div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ДИСТРИБЬЮЦИЯ */}
      <section id="distribution" style={{ padding: "96px 0", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ width: 60, height: 3, background: "#c9a84c", marginBottom: 16 }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600, color: "#111816", marginBottom: 12 }}>Дистрибьюция</h2>
          <p style={{ color: "#6b7280", fontWeight: 300, lineHeight: 1.7, maxWidth: 600, marginBottom: 48 }}>
            Собственная логистическая инфраструктура позволяет нам обеспечивать бесперебойные поставки по всей России
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {DISTRIBUTION_ITEMS.map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: 24, border: "1px solid #f3f4f6", display: "flex", gap: 16, transition: "border-color 0.2s, transform 0.3s" }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "rgba(30,92,58,0.3)"; d.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "#f3f4f6"; d.style.transform = ""; }}
              >
                <div style={{ width: 48, height: 48, border: "1px solid rgba(30,92,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={icon} fallback="Circle" size={20} style={{ color: "#1e5c3a" }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#111816", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СОТРУДНИЧЕСТВО */}
      <section id="cooperation" style={{ padding: "96px 0", background: "#f5f5f3" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ width: 60, height: 3, background: "#c9a84c", marginBottom: 16 }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600, color: "#111816", marginBottom: 12 }}>Сотрудничество</h2>
          <p style={{ color: "#6b7280", fontWeight: 300, lineHeight: 1.7, maxWidth: 600, marginBottom: 48 }}>
            Мы открыты к диалогу с производителями, торговыми сетями и дистрибьюторами. Процесс начала работы прост и прозрачен
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", border: "1px solid #e5e7eb", background: "white", marginBottom: 48 }}>
            {[
              { num: "01", title: "Заявка", desc: "Оставьте заявку через форму или свяжитесь с менеджером напрямую" },
              { num: "02", title: "Переговоры", desc: "Обсуждаем условия сотрудничества, объёмы и логистику" },
              { num: "03", title: "Договор", desc: "Подписываем договор с прозрачными условиями и гарантиями" },
              { num: "04", title: "Поставки", desc: "Начинаем регулярные поставки с контролем качества на каждом этапе" },
            ].map(({ num, title, desc }, i) => (
              <div key={num} style={{ padding: 32, borderRight: i < 3 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(30,92,58,0.15)", fontSize: "5rem", fontWeight: 600, lineHeight: 1, marginBottom: 16 }}>{num}</div>
                <h3 style={{ fontWeight: 600, color: "#111816", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>{title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#1e5c3a", padding: "48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: "white", fontSize: "1.8rem", fontWeight: 600, marginBottom: 8 }}>Готовы начать сотрудничество?</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300, fontSize: "0.85rem" }}>Свяжитесь с нашим коммерческим отделом</p>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="tel:+74951234567" style={{ padding: "12px 32px", background: "#c9a84c", color: "#111816", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
                +7 (495) 123-45-67
              </a>
              <button onClick={() => scrollTo("about")} style={{ padding: "12px 32px", background: "transparent", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.5)", cursor: "pointer" }}>
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section id="advantages" style={{ padding: "96px 0", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ width: 60, height: 3, background: "#c9a84c", marginBottom: 16 }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600, color: "#111816", marginBottom: 12 }}>Преимущества</h2>
          <p style={{ color: "#6b7280", fontWeight: 300, lineHeight: 1.7, maxWidth: 600, marginBottom: 48 }}>
            Почему ведущие торговые сети и производители выбирают ФУДМОЛЛ в качестве партнёра
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {[
              { icon: "Layers", title: "Полный портфель", desc: "Более 500 брендов в категориях: бакалея, заморозка, молочная продукция, снеки, напитки и деликатесы" },
              { icon: "Clock", title: "Надёжные сроки", desc: "Соблюдение договорённостей и сроков поставки — наш главный приоритет уже 15 лет" },
              { icon: "FileText", title: "Документальное сопровождение", desc: "Полный пакет сертификатов, деклараций и разрешений для каждого товара" },
              { icon: "Users", title: "Команда экспертов", desc: "Персональные менеджеры и специалисты ВЭД с глубоким знанием рынка" },
              { icon: "RefreshCw", title: "Гибкие условия", desc: "Индивидуальные условия оплаты, объёмов и периодичности поставок" },
              { icon: "Star", title: "Премиальное качество", desc: "Тщательный отбор поставщиков и обязательный входной контроль качества" },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: 20, padding: 24, transition: "background 0.2s, transform 0.3s" }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = "#f5f5f3"; d.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = ""; d.style.transform = ""; }}
              >
                <div style={{ width: 32, height: 32, background: "rgba(30,92,58,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Icon name={icon} fallback="Circle" size={16} style={{ color: "#1e5c3a" }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#111816", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111816", padding: "48px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", color: "white", fontSize: "1.5rem", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 12 }}>ФУДМОЛЛ</div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}>Один из крупнейших импортёров продуктов питания в России</p>
            </div>
            <div>
              <h4 style={{ color: "white", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16, fontWeight: 500 }}>Разделы</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {NAV_ITEMS.map(({ id, label }) => (
                  <button key={id} onClick={() => scrollTo(id)} style={{ textAlign: "left", background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", fontWeight: 300, cursor: "pointer", fontFamily: "'Montserrat', sans-serif", padding: 0 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: "white", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16, fontWeight: 500 }}>Контакты</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="tel:+74951234567" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", fontWeight: 300, textDecoration: "none" }}>+7 (495) 123-45-67</a>
                <a href="mailto:info@foodmall.ru" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", fontWeight: 300, textDecoration: "none" }}>info@foodmall.ru</a>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", fontWeight: 300, margin: 0 }}>г. Москва, ул. Складочная, 1</p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", margin: 0 }}>© 2024 ФУДМОЛЛ. Все права защищены.</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", margin: 0 }}>ООО «ФУДМОЛЛ» · ИНН 7700000000</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </div>
  );
}
