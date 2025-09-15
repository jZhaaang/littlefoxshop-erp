# LittleFoxShop ERP

A lightweight ERP-style web application built for managing a small Etsy dropshipping store.  
This project was developed as a way to learn full-stack development with React and TypeScript while helping out with a store's organization.

## Features

- **Inventory Management**
  - Log product details, SKUs, descriptions, costs, and stock levels
  - Upload and display product images
  - Manage packaging types, costs, and stock

- **Purchases & Expenses**
  - Record purchases with suppliers
  - Log domestic & international shipping fees
  - Automatically update stock when purchases are made or adjusted

- **Orders**
  - Track customer orders, packaging costs, delivery charges, and revenue

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend / Database:** Supabase (PostgreSQL)

## To-Do

- Team-based databases
- Overview Page to view recent orders, monthly revenue and expenses
- Analytics Page to view month-by-month summaries

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/littlefoxshop-erp.git
   cd littlefoxshop-erp
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up a Supabase project and update.env with your credentials:
   ```
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_ANON_KEY=your-key
   ```
4. Run the dev server:
   ```
   npm run dev
   ```
