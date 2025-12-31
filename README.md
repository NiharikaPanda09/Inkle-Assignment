# Inkle Table Assignment

Short summary
 - Small React demo implementing a customers table using `@tanstack/react-table`, with an Edit modal that updates records via the provided APIs. Built to match the provided Figma design and to showcase clean, production-ready code.

Key features
- **Table UI**: `@tanstack/react-table` used for a performant, flexible table.
- **Edit modal**: Edit `name` and `country` in a modal; country list fetched from the Countries API.
- **API integration**: Reads customers from `/taxes` and countries from `/countries`. Saves edits with `PUT /taxes/:id`.
- **Custom dropdown**: Country selector shows a map-pin and an inline pencil edit action for each country.
- **Filtering**: Country filter popup (boxed UI) with multi-select checkboxes; funnel icon turns blue when active.

Tech stack
- React 18
- Vite (dev server + build)
- @tanstack/react-table
- axios for HTTP
- lucide-react for icons

APIs used
- Customers (taxes): https://685013d7e7c42cfd17974a33.mockapi.io/taxes
- Countries: https://685013d7e7c42cfd17974a33.mockapi.io/countries

Quick start
- Install dependencies:

```bash
npm install
```

- Start development server:

```bash
npm run dev
```

Open the Vite URL shown in the terminal (usually http://localhost:5173).

What to look for (recruiter checklist)
- **Table**: Customers list with columns `Entity`, `Gender`, `Request date`, `Country`, and an Edit action.
- **Edit flow**: Click the edit icon to open the modal. Change `Name` and/or `Country` and click Save — the app makes a `PUT` request and updates the UI.
- **Country dropdown**: Shows pin icon at left and pencil (inline edit) at right for each country. Pencil opens an inline editor to rename the country locally.
- **Filter**: Click the funnel on the `Country` header to open a boxed multi-select popup. Select countries to filter the table.

Project structure (important files)
- `src/App.jsx` — app root, data fetching, modal state.
- `src/components/TableView.jsx` — table implementation using `@tanstack/react-table` and the country filter UI.
- `src/components/EditModal.jsx` — modal, custom country dropdown, inline country edit.
- `src/index.css` — styling for table, modal and dropdowns.

Implementation notes (why these choices)
- `@tanstack/react-table` is the industry-standard lightweight table with excellent customization (sorting, filtering, pagination). The table data is pre-filtered before being passed to the table to avoid complexity with custom filter shapes.
- Custom dropdown in the modal was implemented to match the Figma visual and to enable the inline country-edit affordance.
- The country edits are currently local (in-memory) — they can be persisted with a `PUT /countries/:id` call if you want edits to be saved to the server.

Testing and verification
- Manual: run the app and verify the table loads, the filter popup works, and edits persist in the UI after Save.
- Network: open browser DevTools to confirm `GET /taxes`, `GET /countries`, and `PUT /taxes/:id` calls.

Possible next improvements
- Add pagination and sorting using `@tanstack/react-table` built-ins.
- Persist country rename edits back to the Countries API.
- Close dropdown on outside click and add ARIA + keyboard navigation for accessibility.

Contact
- If you want me to walk through the code or add the persistence for country edits, tell me which feature to add next.
