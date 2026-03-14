src/
│
├── app/                     # Redux store setup
│   ├── store.js
│   └── rootReducer.js
│
├── assets/                  # Images, icons, banners
│   ├── images/
│   ├── icons/
│   └── banners/
│
├── components/              # Reusable UI components
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Loader.jsx
│   │   └── Modal.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│
├── features/                # 🔥 Redux Feature Modules
│   ├── auth/
│   │   ├── authSlice.js
│   │   ├── authAPI.js
│   │   └── Login.jsx
│   │
│   ├── products/
│   │   ├── productsSlice.js
│   │   ├── productsAPI.js
│   │   ├── ProductCard.jsx
│   │   └── ProductList.jsx
│   │
│   ├── cart/
│   │   ├── cartSlice.js
│   │   ├── CartItem.jsx
│   │   └── CartDrawer.jsx
│   │
│   ├── orders/
│   │   ├── ordersSlice.js
│   │   ├── ordersAPI.js
│   │   └── OrdersPage.jsx
│
├── pages/                   # Route-based pages
│   ├── Home.jsx
│   ├── Category.jsx
│   ├── Checkout.jsx
│   └── NotFound.jsx
│
├── routes/                  # Routing config
│   └── AppRoutes.jsx
│
├── services/                # API configuration
│   ├── axiosInstance.js
│   └── endpoints.js
│
├── hooks/                   # Custom hooks
│   └── useDebounce.js
│
├── utils/                   # Helpers & constants
│   ├── formatPrice.js
│   └── constants.js
│
├── styles/                  # Global styles
│   └── index.css
│
├── App.jsx
└── main.jsx


avsplatform.store
Domain
Period