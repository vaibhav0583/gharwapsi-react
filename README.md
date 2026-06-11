# 🏡 GharWapsi — Live Like a Local

> India's Cultural Homestay Platform. Stay with real Indian families. Not a hotel. Not Airbnb. A home.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Start development server
npm start

# App runs at http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          ← Fixed navigation with mobile menu
│   ├── Cursor.jsx          ← Custom animated cursor
│   ├── FamilyCard.jsx      ← Reusable family listing card
│   ├── ChatBot.jsx         ← AI chat widget (connect to backend)
│   ├── CrowdMap.jsx        ← Live crowd detection display
│   └── useReveal.js        ← Scroll animation hook
│
├── pages/
│   ├── Home.jsx            ← Landing page (all sections)
│   ├── Explore.jsx         ← Search + filter families
│   ├── VibeQuiz.jsx        ← AI personality matching quiz
│   └── Login.jsx           ← Login + Register page
│
├── context/
│   └── AuthContext.jsx     ← Global auth state (useAuth hook)
│
├── services/
│   ├── api.js              ← ALL backend API calls
│   └── data.js             ← Mock data (replace with real API)
│
└── styles/
    └── globals.css         ← CSS variables + base styles
```

---

## 🔌 Connecting to Backend

All API calls are in `src/services/api.js`.

**Step 1** — Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Step 2** — Replace mock data in components.

**Example — Load real families in Explore.jsx:**
```js
// Replace this:
const [filtered, setFiltered] = useState(FAMILIES);

// With this:
useEffect(() => {
  listingsAPI.getAll(filters).then(data => setFiltered(data.listings));
}, [filters]);
```

**Example — Real AI chat in ChatBot.jsx:**
```js
// Replace mock response with:
const data = await aiAPI.chat(userText);
const aiText = data.reply;
```

---

## 📄 Pages Built

| Page | Route | Status |
|---|---|---|
| Landing Page | `/` | ✅ Done |
| Explore / Search | `/explore` | ✅ Done |
| Vibe Quiz | `/quiz` | ✅ Done |
| Login / Register | `/login` | ✅ Done |
| Family Profile | `/family/:id` | 🔲 TODO |
| Host Registration | `/host` | 🔲 TODO |
| Dashboard | `/dashboard` | 🔲 TODO |
| Booking Flow | `/booking/:id` | 🔲 TODO |

---

## 🎨 Design System

```css
--saffron:      #E8651A  /* Primary */
--deep-saffron: #C94F0A  /* Hover */
--turmeric:     #F5A623  /* Accent */
--cream:        #FDF6ED  /* Background */
--earth:        #3D2B1F  /* Text */
--muted:        #8B6E5A  /* Subtext */
```

Fonts: `Playfair Display` (headings) + `DM Sans` (body)

---

## 🛠️ Tech Stack

- **React 18** + React Router v6
- **CSS Modules** (no Tailwind needed — all custom)
- **Context API** for auth state
- Connects to **Node.js + Express** backend

---

## 🏆 Hackathon Tips

For demo, focus on showing:
1. Landing page hero + animations
2. Explore page with filters working
3. Vibe Quiz → matching animation
4. AI chatbot responding
5. Crowd map with live bars

Good luck! 🚀
