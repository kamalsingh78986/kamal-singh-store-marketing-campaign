# John Doe Store — Angular Ecommerce Application

An Angular-based ecommerce storefront built with standalone components, featuring product browsing, category filtering, live search, and a shopping cart.

## 🔗 Live Demo
https://kamalsingh78986-afk.github.io/ecommerce-store/

## 📋 Features
- **Header** — store name, live search box, cart button with item-count badge
- **Sidebar navigation** — filter products by 5 categories: Electronics, Home, Garden, Clothes, Books
- **Product grid** — displays 15 products as cards, each showing name, description, stock status (In Stock / Out of Stock), and price
- **Search** — type in the search box to filter products by name, description, or category in real time
- **Cart** — add/remove products, view running total in a slide-out panel

## 🛠️ Tech Stack
- Angular 18 (standalone components, no NgModules)
- TypeScript
- Plain CSS (no external UI framework)

## 📁 Product Data Model
```ts
{
  id: 'P001',
  name: 'Wireless Headphones',
  description: 'Noise-cancelling wireless headphones',
  price: 79.99,
  imageUrl: 'https://...',
  inStock: true,
  category: 'Electronics'
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
git clone https://github.com/kamalsingh78986-afk/ecommerce-store.git
cd ecommerce-store
npm install
```

### Run locally
```bash
npm start
```
Visit [http://localhost:4200](http://localhost:4200)

### Build for production
```bash
npm run build
```
Output is generated in `dist/ecommerce-store/browser`.

## ☁️ Deployment
This project is deployed on **Vercel**. Configuration is already set up in `vercel.json`:
- Build command: `npm run build`
- Output directory: `dist/ecommerce-store/browser`

created by 
**Kamal Singh**  
GitHub: [@kamalsingh78986-afk](https://github.com/kamalsingh78986-afk)