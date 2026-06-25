# Ferry Booking — Frontend Prototyp

React-basierte Fährbuchungs-Oberfläche (Mock-Daten).  
Design orientiert an [Mr Ferry](https://www.misterferry.de/), Farben nach AML Ferry Markenfarben.

## Funktionen

- Suchformular (Hin-/Rückfahrt, Passagiere, Fahrzeug)
- Seferergebnisse mit Datumsleiste und Tagespreisen
- Passagierdaten & Zahlung (Mock)
- Buchungsbestätigung

## Voraussetzungen

- Node.js 18+
- npm

## Installation & Start

```bash
npm install
npm run dev
```

Öffnen: http://localhost:5173

## Production Build

```bash
npm run build
npm run preview
```

## Technologie

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- React Router

## Hinweis

API-Anbindung und Excel-Limandaten sind noch nicht integriert — aktuell Mock-Daten.

---

## Questions for the Client

Please answer these questions so we can connect the frontend to your real system.

### Branding

1. What is your company name? (We use a placeholder name right now.)
2. Do you have a logo file? (PNG or SVG)
3. Should we keep the current colors, or do you have a brand guide?
4. Which menu links do you need in the header and footer?

### Routes & Data

5. When will you send the port/route list? (Excel or other format)
6. Which routes should be active at launch?
7. Are some routes round-trip only?
8. Must return trips be booked on the same day for some routes?
9. Is a vehicle required on some routes?
10. What should happen for groups with more than 9 passengers?

### Passengers & Vehicles

11. Are the passenger age groups correct? (Adult 12+, Youth 12–26, Senior 60+, Child 4–11, Infant 0–3)
12. Which routes support resident discount?
13. Do you use family discount (familia numerosa)?
14. Is vehicle brand/model required?
15. Are vehicle length and height required? For which vehicle types?
16. How are trailers and caravans priced?
17. Are bicycles booked separately?
18. How do pets work? Is there a cabin option for pets?

### Languages

19. Which languages do you need? (German, English, French, Spanish, Italian, etc.)
20. What is the default language?

### Backend / API (very important)

21. When will API documentation be ready?
22. What is the API base URL? (Example: `https://api.yourcompany.com`)
23. How do we authenticate? (API key, token, login?)
24. Which endpoint returns the port list?
25. Which endpoint searches ferries? (Please share request + response examples)
26. Who calculates the price — your backend or the frontend?
27. How does payment work? (Stripe, bank, redirect to your page, etc.)

### Booking Flow

28. After selecting a ferry, do users choose cabin/seat type?
29. Which passenger fields are required? (Passport, ID, license plate, etc.)
30. Should users download a real PDF e-ticket?
31. Do you need user login / account area?

### Delivery & Hosting

32. Will this frontend be embedded in your website or run on a separate domain?
33. Who will host it — you or us?
34. Do you also need a mobile app, or only web?

---

**Priority questions** (please answer first):

- Company name and logo
- Port/route Excel file — when?
- API documentation and URL — when?
- Real payment integration or UI only?
- Cabin/seat selection — yes or no?
