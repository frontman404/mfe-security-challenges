# Vulnerable Shopping Website

This directory contains the intentionally vulnerable implementation of the same shopping website architecture.

## What this app demonstrates

- modular microfrontends for `auth`, `cart`, `order`, `products`, and `container`
- insecure patterns or weak handling of authentication, input, or cross-module data
- a realistic comparison point for evaluating microfrontend security

## Folder structure

- `auth/` — authentication frontend and backend
- `cart/` — cart management microfrontend
- `order/` — order flow microfrontend
- `products/` — product catalog microfrontend
- `container/` — host shell and orchestration for the microfrontends

## Running the vulnerable app

Each app has its own startup instructions in the relevant subproject folder. Generally:

```bash
cd secure-shopping-website/<subproject>
npm install
npm start
```

If the project includes a `start-all.sh` script, you can use that from the app root to launch all services together.

## Notes

This version is intended for study and comparison only. Use it as a reference implementation when discussing vulnerable design decisions.
