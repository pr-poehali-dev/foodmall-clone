import { useState } from "react";
import Icon from "@/components/ui/icon";

const MOUNTAIN_BG = "https://cdn.poehali.dev/projects/61fd0b6c-5b47-4e24-b79a-cfff7711bb67/files/361f8589-377b-4531-99a8-a557c09aa9fd.jpg";

const NAV_ITEMS = [
  { id: "about", label: "О НАС" },
  { id: "clients", label: "КЛИЕНТЫ" },
  { id: "distribution", label: "ДИСТРИБУЦИЯ" },
  { id: "cooperation", label: "СОТРУДНИЧЕСТВО" },
  { id: "advantages", label: "ПРЕИМУЩЕСТВА" },
];

// Бренды — текстовые названия в стиле оригинала
const BRANDS = [
  { name: "ISTISU", color: "#2d8a4e", style: "italic" },
  { name: "Coca‑Cola", color: "#e00", style: "bold" },
  { name: "milaf", color: "#d4a843", style: "bold" },
  { name: "PRINGLES", color: "#c0392b", style: "bold" },
  { name: "PEPSICO", color: "#003087", style: "bold" },
  { name: "Corona Extra", color: "#c9a030", style: "bold" },
  { name: "Miller", color: "#c0392b", style: "bold" },
  { name: "БАЙКАЛ", color: "#1a5276", style: "bold" },
  { name: "Черноголовка", color: "#c0392b", style: "bold" },
  { name: "Натахтари", color: "#27ae60", style: "bold" },
  { name: "Vinut", color: "#27ae60", style: "bold" },
  { name: "Очаково", color: "#2471a3", style: "bold" },
  { name: "OREO", color: "#1a1a2e", style: "bold" },
  { name: "Starbucks", color: "#1e8449", style: "bold" },
  { name: "Raffaello", color: "#c0392b", style: "italic" },
  { name: "РЫЧАЛ-СУ", color: "#1a5276", style: "bold" },
  { name: "Lindt", color: "#8b0000", style: "italic" },
  { name: "Budweiser", color: "#c0392b", style: "bold" },
  { name: "FERRERO ROCHER", color: "#8b6914", style: "bold" },
  { name: "Guinness", color: "#1a1a1a", style: "bold" },
  { name: "BORJOMI", color: "#1e8449", style: "bold" },
  { name: "NESCAFÉ", color: "#c0392b", style: "bold" },
  { name: "evian", color: "#2471a3", style: "normal" },
  { name: "S.PELLEGRINO", color: "#c0392b", style: "bold" },
  { name: "МУЛТОН", color: "#e67e22", style: "bold" },
  { name: "Dr Pepper", color: "#6e1423", style: "bold" },
  { name: "Санбери", color: "#c9a030", style: "italic" },
  { name: "PANNA", color: "#c0392b", style: "bold" },
  { name: "HARIBO", color: "#f39c12", style: "bold" },
  { name: "KitKat", color: "#c0392b", style: "bold" },
  { name: "FANTA", color: "#e67e22", style: "bold" },
  { name: "БАЛТИКА", color: "#1a5276", style: "bold" },
  { name: "Kinder", color: "#c0392b", style: "bold" },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function Navbar() {
  const [activeSection, setActiveSection] = useState("distribution");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "white",
      boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, #1e5c3a, #2d8a52)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="Leaf" size={14} style={{ color: "white" }} />
          </div>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700, fontSize: "1.25rem", letterSpacing: "0.02em",
          }}>
            <span style={{ color: "#1e5c3a" }}>FOOD</span><span style={{ color: "#c9a84c" }}>MALL</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden md:flex">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setActiveSection(id); }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.68rem", fontWeight: 500,
                letterSpacing: "0.08em",
                color: activeSection === id ? "#c9a84c" : "#444",
                background: "none", border: "none", cursor: "pointer",
                borderBottom: activeSection === id ? "2px solid #c9a84c" : "2px solid transparent",
                paddingBottom: 2,
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile */}
        <button className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} style={{ color: "#333" }} />
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background: "white", borderTop: "1px solid #f0f0f0" }}>
          {NAV_ITEMS.map(({ id, label }) => (
            <button key={id} onClick={() => { scrollTo(id); setMobileOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 24px", fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: "#444", background: "none", border: "none", borderBottom: "1px solid #f5f5f5", cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default function Index() {
  const [form, setForm] = useState({ name: "", surname: "", org: "", phone: "", agree1: false, agree2: false });

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* HERO — горный баннер */}
      <div style={{
        marginTop: 64,
        position: "relative",
        height: 320,
        overflow: "hidden",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}>
        <img
          src={MOUNTAIN_BG}
          alt="горы"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        {/* Water drops overlay effect */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 100%)",
        }} />
        {/* Brand logo centered */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: 12,
            padding: "20px 40px",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #1e5c3a, #2d8a52)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="Droplets" size={16} style={{ color: "white" }} />
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 700, color: "#1e5c3a", letterSpacing: "0.15em" }}>ISTISU</span>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", color: "#888", letterSpacing: "0.2em", marginTop: 4, textTransform: "uppercase" }}>
              Природная минеральная вода
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}>
            <Icon name="ChevronDown" size={16} style={{ color: "#1e5c3a" }} />
          </div>
        </div>
      </div>

      {/* ДИСТРИБУЦИЯ И БРЕНДЫ */}
      <section id="distribution" style={{ padding: "64px 0 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem", fontWeight: 700,
            color: "#1a1a1a",
            borderLeft: "4px solid #c9a84c",
            paddingLeft: 12,
            marginBottom: 12,
            letterSpacing: "0.05em",
          }}>
            ДИСТРИБУЦИЯ И БРЕНДЫ
          </h2>
          <p style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 48, fontWeight: 300, maxWidth: 640 }}>
            Наша компания предлагает широкий ассортимент ведущих мировых и отечественных брендов. Мы являемся официальным дистрибьютором напитков{" "}
            <strong style={{ fontWeight: 600 }}>Milaf</strong> и <strong style={{ fontWeight: 600 }}>ISTISU</strong> во всех национальных розничных сетях.
          </p>

          {/* Бренды — сетка */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "32px 16px",
            alignItems: "center",
          }}>
            {BRANDS.map(({ name, color, style: fontStyle }) => (
              <div
                key={name}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "12px 8px",
                  cursor: "default",
                  transition: "opacity 0.2s",
                  minHeight: 60,
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = "0.7"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = "1"}
              >
                <span style={{
                  fontFamily: fontStyle === "italic" ? "'Cormorant Garamond', serif" : "'Montserrat', sans-serif",
                  fontStyle: fontStyle === "italic" ? "italic" : "normal",
                  fontWeight: fontStyle === "bold" ? 800 : 400,
                  fontSize: name.length > 10 ? "0.85rem" : "1.1rem",
                  color,
                  textAlign: "center",
                  letterSpacing: name === name.toUpperCase() ? "0.05em" : "0",
                  lineHeight: 1.2,
                }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ФОРМА + РЕКВИЗИТЫ */}
      <section id="cooperation" style={{ padding: "80px 0", background: "#fafafa", marginTop: 40 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          {/* Форма */}
          <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#444", marginBottom: 4 }}>
                  Имя <span style={{ color: "#e00" }}>*</span>
                </label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{ width: "100%", borderBottom: "1px solid #bbb", border: "none", borderBottom: "1px solid #bbb", outline: "none", padding: "6px 0", fontSize: "0.85rem", background: "transparent", fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#444", marginBottom: 4 }}>
                  Фамилия
                </label>
                <input
                  type="text"
                  value={form.surname}
                  onChange={e => setForm(f => ({ ...f, surname: e.target.value }))}
                  style={{ width: "100%", border: "none", borderBottom: "1px solid #bbb", outline: "none", padding: "6px 0", fontSize: "0.85rem", background: "transparent", fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#444", marginBottom: 4 }}>
                Организация
              </label>
              <input
                type="text"
                value={form.org}
                onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                style={{ width: "100%", border: "none", borderBottom: "1px solid #bbb", outline: "none", padding: "6px 0", fontSize: "0.85rem", background: "transparent", fontFamily: "'Montserrat', sans-serif" }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#444", marginBottom: 4 }}>
                Номер телефона <span style={{ color: "#e00" }}>*</span>
              </label>
              <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #bbb", paddingBottom: 6 }}>
                <span style={{ fontSize: "0.85rem", color: "#555", marginRight: 8 }}>🇷🇺</span>
                <input
                  type="tel" required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="Укажите телефон"
                  style={{ flex: 1, border: "none", outline: "none", fontSize: "0.85rem", background: "transparent", fontFamily: "'Montserrat', sans-serif", color: form.phone ? "#222" : "#c0392b" }}
                />
              </div>
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.agree1}
                onChange={e => setForm(f => ({ ...f, agree1: e.target.checked }))}
                style={{ marginTop: 2, accentColor: "#1e5c3a" }}
              />
              <span style={{ fontSize: "0.72rem", color: "#555", lineHeight: 1.5 }}>
                Согласен на обработку персональных данных <span style={{ color: "#e00" }}>*</span>
              </span>
            </label>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 28, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.agree2}
                onChange={e => setForm(f => ({ ...f, agree2: e.target.checked }))}
                style={{ marginTop: 2, accentColor: "#1e5c3a" }}
              />
              <span style={{ fontSize: "0.72rem", color: "#555", lineHeight: 1.5 }}>
                Согласен на политику обработки персональных данных <span style={{ color: "#e00" }}>*</span>
              </span>
            </label>

            <button
              type="submit"
              style={{
                padding: "12px",
                background: "white",
                border: "1px solid #ccc",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                color: "#333",
                cursor: "pointer",
                transition: "all 0.2s",
                maxWidth: 280,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1e5c3a"; (e.currentTarget as HTMLButtonElement).style.color = "white"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#1e5c3a"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "white"; (e.currentTarget as HTMLButtonElement).style.color = "#333"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#ccc"; }}
            >
              Отправить
            </button>
          </form>

          {/* Реквизиты */}
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: 4 }}>
              ООО «ФУДМОЛЛ»
            </p>
            <p style={{ fontSize: "0.8rem", color: "#555", marginBottom: 16, fontWeight: 300 }}>
              INFO@FOODMALL.RU<br />
              ТЕЛ: +7 (495) 640-58-91
            </p>

            <p style={{ fontSize: "0.75rem", color: "#777", lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
              ОГРН 1207700210266<br />
              ИНН/КПП 7736328481/775101001
            </p>

            <p style={{ fontSize: "0.75rem", color: "#777", lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
              108802, г. МОСКВА, ВН. ТЕР. Г.<br />
              МУНИЦИПАЛЬНЫЙ ОКРУГ КОММУНАРКА, Ш.<br />
              КАЛУЖСКОЕ, КМ. 22-Й, Д.10, СТР. 23, ЭТАЖ 13,<br />
              КОМ.13Д4-А
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <a href="#" style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "#4a76a8",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
              }}>
                <span style={{ color: "white", fontSize: "0.75rem", fontWeight: 700 }}>VK</span>
              </a>
              <a href="#" style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "#2ca5e0",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
              }}>
                <Icon name="Send" size={14} style={{ color: "white" }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ebebeb", padding: "20px 32px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.65rem", color: "#aaa" }}>Powered by</span>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#c9a84c", letterSpacing: "0.05em" }}>ТЕХРОВ</span>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["ИСПОЛЬЗОВАНИЕ ФАЙЛОВ COOKIE", "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ", "СОГЛАШЕНИЕ ПОЛЬЗОВАТЕЛЯ САЙТА"].map(link => (
              <a key={link} href="#" style={{ fontSize: "0.6rem", color: "#999", textDecoration: "none", letterSpacing: "0.04em" }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
