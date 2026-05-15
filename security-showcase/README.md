# Security Showcase

This folder contains demonstration assets for the vulnerability in the vulnerable microfrontend app.

## What is included

- `cors.html` — example showing cross-origin or misconfigured CORS behavior
- `cors.css` — styles for the CORS demonstration
- `neckbook.html` — interactive example used to highlight an exploit or insecure behavior
- `neckbook.css` — styles for the exploit showcase

## Purpose

The renamed `security-showcase/` folder is meant to be a more compelling place for attack proof-of-concept content. It is separate from both the secure and vulnerable app implementations.

## How to use it``

Open the HTML files in your browser or serve them from a simple static server. They are designed to illustrate the vulnerability through focused examples.

Example:

```bash
cd security-showcase
python3 -m http.server 8000
```

Then open `http://localhost:8000/cors.html` or `http://localhost:8000/neckbook.html`.
