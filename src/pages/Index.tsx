import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const MOUNTAIN_BG =
  "https://cdn.poehali.dev/projects/61fd0b6c-5b47-4e24-b79a-cfff7711bb67/files/361f8589-377b-4531-99a8-a557c09aa9fd.jpg";

const NAV_ITEMS = [
  { id: "about", label: "О НАС" },
  { id: "clients", label: "КЛИЕНТЫ" },
  { id: "distribution", label: "ДИСТРИБУЦИЯ" },
  { id: "cooperation", label: "СОТРУДНИЧЕСТВО" },
  { id: "advantages", label: "ПРЕИМУЩЕСТВА" },
];

const BRANDS: { name: string; logo: string }[] = [
  { name: "ISTISU", logo: "https://logo.clearbit.com/istisu.az" },
  { name: "Coca-Cola", logo: "https://logo.clearbit.com/coca-cola.com" },
  { name: "milaf", logo: "https://logo.clearbit.com/milaf.ru" },
  { name: "Pringles", logo: "https://logo.clearbit.com/pringles.com" },
  { name: "PepsiCo", logo: "https://logo.clearbit.com/pepsico.com" },
  { name: "Corona Extra", logo: "https://logo.clearbit.com/corona.com" },
  { name: "Miller", logo: "https://logo.clearbit.com/millerlite.com" },
  { name: "БАЙКАЛ", logo: "https://logo.clearbit.com/baikalwater.ru" },
  { name: "Черноголовка", logo: "https://logo.clearbit.com/chernogolovka.ru" },
  { name: "Натахтари", logo: "https://logo.clearbit.com/natakhtari.ge" },
  { name: "Vinut", logo: "https://logo.clearbit.com/vinut.vn" },
  { name: "Очаково", logo: "https://logo.clearbit.com/ochakovo.ru" },
  { name: "Oreo", logo: "https://logo.clearbit.com/oreo.com" },
  { name: "Starbucks", logo: "https://logo.clearbit.com/starbucks.com" },
  { name: "Raffaello", logo: "https://logo.clearbit.com/raffaello.com" },
  { name: "РЫЧАЛ-СУ", logo: "https://logo.clearbit.com/rychal-su.ru" },
  { name: "Lindt", logo: "https://logo.clearbit.com/lindt.com" },
  { name: "Budweiser", logo: "https://logo.clearbit.com/budweiser.com" },
  { name: "Ferrero Rocher", logo: "https://logo.clearbit.com/ferrero.com" },
  { name: "Guinness", logo: "https://logo.clearbit.com/guinness.com" },
  { name: "BORJOMI", logo: "https://logo.clearbit.com/borjomi.com" },
  { name: "NESCAFÉ", logo: "https://logo.clearbit.com/nescafe.com" },
  { name: "evian", logo: "https://logo.clearbit.com/evian.com" },
  { name: "S.PELLEGRINO", logo: "https://logo.clearbit.com/sanpellegrino.com" },
  { name: "МУЛТОН", logo: "https://logo.clearbit.com/multon.ru" },
  { name: "Dr Pepper", logo: "https://logo.clearbit.com/drpepper.com" },
  { name: "Санбери", logo: "https://logo.clearbit.com/sunberry.ru" },
  { name: "Acqua Panna", logo: "https://logo.clearbit.com/acquapanna.com" },
  { name: "HARIBO", logo: "https://logo.clearbit.com/haribo.com" },
  { name: "KitKat", logo: "https://logo.clearbit.com/kitkat.com" },
  { name: "FANTA", logo: "https://logo.clearbit.com/fanta.com" },
  { name: "БАЛТИКА", logo: "https://logo.clearbit.com/baltika.ru" },
  { name: "Kinder", logo: "https://logo.clearbit.com/kinder.com" },
];

function BrandLogo({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: 200,
        height: 140,
        borderRadius: 12,
        border: `1.5px solid ${hovered ? "#c0392b" : "#ebebeb"}`,
        background: hovered ? "#fff8f7" : "#fff",
        boxShadow: hovered ? "0 6px 24px rgba(192,57,43,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
        cursor: "default",
        padding: "18px 20px",
      }}
    >
      {!failed ? (
        <img
          src={logo}
          alt={name}
          onError={() => setFailed(true)}
          style={{
            maxHeight: 72,
            maxWidth: 150,
            objectFit: "contain",
            filter: hovered ? "none" : "grayscale(30%)",
            opacity: hovered ? 1 : 0.82,
            transition: "all 0.22s ease",
          }}
        />
      ) : (
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "1.15rem",
            color: "#1a1a1a",
            textAlign: "center",
            letterSpacing: "0.04em",
          }}
        >
          {name}
        </span>
      )}
      <span style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.68rem",
        fontWeight: 700,
        color: hovered ? "#c0392b" : "#bbb",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        transition: "color 0.22s ease",
      }}>
        {name}
      </span>
    </div>
  );
}

function BrandCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const offset = useRef(0);
  const rafRef = useRef<number>(0);

  const doubled = [...BRANDS, ...BRANDS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const itemWidth = 224;
    const totalWidth = BRANDS.length * itemWidth;

    const animate = () => {
      if (!paused) {
        offset.current += 0.5;
        if (offset.current >= totalWidth) offset.current = 0;
        if (track) track.style.transform = `translateX(-${offset.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  return (
    <div style={{ overflow: "hidden", position: "relative", margin: "0 -40px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, white, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, white, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div ref={trackRef} style={{ display: "flex", alignItems: "center", willChange: "transform" }}>
        {doubled.map((b, i) => (
          <div key={i} style={{ flex: "0 0 224px", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 12px", height: 172 }}>
            <BrandLogo name={b.name} logo={b.logo} />
          </div>
        ))}
      </div>
    </div>
  );
}

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Index() {
  const [activeSection, setActiveSection] = useState("distribution");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    org: "",
    phone: "",
    agree1: false,
    agree2: false,
  });

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "white", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "white", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #9b1c1c, #c0392b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Truck" size={13} style={{ color: "white" }} />
            </div>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "0.02em" }}>
              <span style={{ color: "#1a1a1a" }}>БИГ-</span><span style={{ color: "#c0392b" }}>ИМПОРТ</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden md:flex">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button key={id} onClick={() => { scrollTo(id); setActiveSection(id); }}
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.08em", color: isActive ? "#c0392b" : "#555", background: "transparent", border: "none", borderBottom: isActive ? "2px solid #c0392b" : "2px solid transparent", cursor: "pointer", padding: "6px 12px", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.color = "#c0392b"; (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "rgba(192,57,43,0.35)"; } }}
                  onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.color = "#555"; (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "transparent"; } }}>
                  {label}
                </button>
              );
            })}
          </nav>

          <button className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} style={{ color: "#333" }} />
          </button>
        </div>

        {mobileOpen && (
          <div style={{ background: "white", borderTop: "1px solid #f0f0f0" }}>
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} onClick={() => { scrollTo(id); setMobileOpen(false); setActiveSection(id); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 24px", fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: activeSection === id ? "#c0392b" : "#444", background: activeSection === id ? "#fdf2f0" : "none", border: "none", borderBottom: "1px solid #f5f5f5", borderLeft: activeSection === id ? "3px solid #c0392b" : "3px solid transparent", cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <div style={{ marginTop: 64, position: "relative", height: 300, overflow: "hidden", borderBottomLeftRadius: 48, borderBottomRightRadius: 48 }}>
        <img src={MOUNTAIN_BG} alt="горы" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)" }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-start", padding: "0 60px 36px" }}>
          <div>
            <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "2.4rem", fontWeight: 900, color: "white", letterSpacing: "0.04em", textShadow: "0 2px 16px rgba(0,0,0,0.4)", margin: 0, lineHeight: 1.1 }}>
              БИГ-ИМПОРТ
            </h1>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", marginTop: 8, fontWeight: 400, textShadow: "0 1px 8px rgba(0,0,0,0.4)", letterSpacing: "0.04em" }}>
              Официальный дистрибьютор мировых брендов
            </p>
          </div>
        </div>


      </div>

      {/* ── О НАС ── */}
      <section id="about" style={{ padding: "64px 0 56px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 40px" }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#1a1a1a", letterSpacing: "0.06em", marginBottom: 12 }}>
            О НАС
          </h2>
          <p style={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.75, marginBottom: 48, fontWeight: 400, maxWidth: 660 }}>
            БИГ-ИМПОРТ — ведущий дистрибьютор продуктов питания и напитков на российском рынке. Мы работаем с крупнейшими мировыми и отечественными брендами, обеспечивая их присутствие во всех национальных розничных сетях.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "Globe", title: "Международные бренды", text: "Официальный дистрибьютор более 30 мировых брендов. Работаем напрямую с производителями без посредников." },
              { icon: "Store", title: "Все розничные сети", text: "Наша продукция представлена в крупнейших сетях: Магнит, X5, Лента, Ашан, Metro и сотнях региональных ретейлеров." },
              { icon: "Truck", title: "Собственная логистика", text: "Флот из 50+ автомобилей. Доставка в любую точку России в срок от 1 до 3 дней." },
              { icon: "ShieldCheck", title: "Гарантия качества", text: "Каждая партия товара проходит многоступенчатый контроль качества. Работаем только с сертифицированными поставщиками." },
              { icon: "HeartHandshake", title: "Долгосрочное партнёрство", text: "Более 15 лет на рынке. За это время выстроили прочные отношения с тысячами партнёров по всей стране." },
              { icon: "BarChart3", title: "Рост продаж", text: "Помогаем брендам увеличивать долю на полке. Наши клиенты в среднем показывают +35% роста продаж в первый год." },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{ border: "1px solid #e0e0e0", borderRadius: 4, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12, transition: "border-color 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#c0392b"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(192,57,43,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e0e0e0"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "#fdf2f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={icon} size={20} style={{ color: "#c0392b" }} />
                </div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#1a1a1a", margin: 0, lineHeight: 1.4 }}>{title}</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#666", margin: 0, lineHeight: 1.7, fontWeight: 400 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ДИСТРИБУЦИЯ И БРЕНДЫ ── */}
      <section id="distribution" style={{ padding: "60px 0 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 40px" }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#1a1a1a", letterSpacing: "0.06em", marginBottom: 12 }}>
            ДИСТРИБУЦИЯ И БРЕНДЫ
          </h2>
          <p style={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.75, marginBottom: 48, fontWeight: 400, maxWidth: 660 }}>
            Мы не просто поставляем товар — мы выстраиваем присутствие бренда на полке. В нашем портфеле более 30 торговых марок: от культовых мировых имён до любимых отечественных производителей. Каждый бренд — это отдельная история переговоров, логистики и доверия, которое мы заслужили годами работы. Сегодня продукция наших партнёров есть в каждом федеральном ретейлере страны.
          </p>

          <BrandCarousel />
        </div>
      </section>

      {/* ── ФОРМА + РЕКВИЗИТЫ ── */}
      <section id="cooperation" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          {/* Форма */}
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", color: "#333", marginBottom: 6 }}>Имя <span style={{ color: "#e00" }}>*</span></label>
                <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={{ width: "100%", border: "none", borderBottom: "1px solid #ccc", outline: "none", padding: "6px 0", fontSize: "0.82rem", background: "transparent", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", color: "#333", marginBottom: 6 }}>Фамилия</label>
                <input type="text" value={form.surname} onChange={(e) => setForm((f) => ({ ...f, surname: e.target.value }))}
                  style={{ width: "100%", border: "none", borderBottom: "1px solid #ccc", outline: "none", padding: "6px 0", fontSize: "0.82rem", background: "transparent", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: "0.72rem", color: "#333", marginBottom: 6 }}>Организация</label>
              <input type="text" value={form.org} onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
                style={{ width: "100%", border: "none", borderBottom: "1px solid #ccc", outline: "none", padding: "6px 0", fontSize: "0.82rem", background: "transparent", fontFamily: "'Montserrat', sans-serif" }} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: "0.72rem", color: "#333", marginBottom: 6 }}>Номер телефона <span style={{ color: "#e00" }}>*</span></label>
              <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: 6, gap: 6 }}>
                <span style={{ fontSize: "1rem" }}>🇷🇺</span>
                <span style={{ fontSize: "0.75rem", color: "#666" }}>▾</span>
                <input type="tel" required placeholder="Укажите телефон" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  style={{ flex: 1, border: "none", outline: "none", fontSize: "0.82rem", background: "transparent", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              {!form.phone && (
                <p style={{ fontSize: "0.67rem", color: "#e44", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="AlertCircle" size={11} /> Укажите телефон
                </p>
              )}
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, cursor: "pointer" }}>
              <input type="checkbox" checked={form.agree1} onChange={(e) => setForm((f) => ({ ...f, agree1: e.target.checked }))} style={{ marginTop: 2, accentColor: "#c0392b" }} />
              <span style={{ fontSize: "0.7rem", color: "#444", lineHeight: 1.6 }}>Согласен на обработку персональных данных <span style={{ color: "#e00" }}>*</span></span>
            </label>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 28, cursor: "pointer" }}>
              <input type="checkbox" checked={form.agree2} onChange={(e) => setForm((f) => ({ ...f, agree2: e.target.checked }))} style={{ marginTop: 2, accentColor: "#c0392b" }} />
              <span style={{ fontSize: "0.7rem", color: "#444", lineHeight: 1.6 }}>Согласен на политику обработки персональных данных <span style={{ color: "#e00" }}>*</span></span>
            </label>

            <button type="submit"
              style={{ padding: "11px 0", background: "white", border: "1px solid #bbb", fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", letterSpacing: "0.04em", color: "#333", cursor: "pointer", maxWidth: 280, transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#c0392b"; (e.currentTarget as HTMLButtonElement).style.color = "white"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#c0392b"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "white"; (e.currentTarget as HTMLButtonElement).style.color = "#333"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#bbb"; }}>
              Отправить
            </button>
          </form>

          {/* Реквизиты */}
          <div style={{ paddingTop: 8 }}>
            <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a1a1a", marginBottom: 6 }}>ООО «ФУДМОЛЛ»</p>
            <p style={{ fontSize: "0.78rem", color: "#444", lineHeight: 1.9, marginBottom: 16 }}>
              INFO@FOODMALL.RU<br />ТЕЛ: +7 (495) 640-58-91
            </p>
            <p style={{ fontSize: "0.72rem", color: "#666", lineHeight: 1.9, marginBottom: 16 }}>
              ОГРН 1207700210266<br />ИНН/КПП 7736328481/775101001
            </p>
            <p style={{ fontSize: "0.72rem", color: "#666", lineHeight: 1.9, marginBottom: 20 }}>
              108802, г. МОСКВА, ВН. ТЕР. Г.<br />
              МУНИЦИПАЛЬНЫЙ ОКРУГ КОММУНАРКА, Ш.<br />
              КАЛУЖСКОЕ, КМ. 22-Й, Д.10, СТР. 23, ЭТАЖ 13,<br />
              КОМ.13Д4-А
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <a href="#" style={{ width: 32, height: 32, borderRadius: "50%", background: "#4a76a8", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <span style={{ color: "white", fontSize: "0.65rem", fontWeight: 800 }}>ВК</span>
              </a>
              <a href="#" style={{ width: 32, height: 32, borderRadius: "50%", background: "#2ca5e0", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <Icon name="Send" size={13} style={{ color: "white" }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #ebebeb", padding: "16px 32px", background: "white" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: "0.6rem", color: "#bbb" }}>Powered by</span>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#c0392b", letterSpacing: "0.06em" }}>ТЕХРОВ</span>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["ИСПОЛЬЗОВАНИЕ ФАЙЛОВ COOKIE", "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ", "СОГЛАШЕНИЕ ПОЛЬЗОВАТЕЛЯ САЙТА"].map((link) => (
              <a key={link} href="#" style={{ fontSize: "0.58rem", color: "#aaa", textDecoration: "none", letterSpacing: "0.04em" }}>{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}