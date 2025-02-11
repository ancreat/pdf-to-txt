# PDF-to-TXT Converter

A modern web application that converts PDF files to text format with batch processing capabilities.

## 🚀 Demo

Try it out: [Live Demo](https://ancreat.github.io/pdf-to-txt/)

## ✨ Key Features

- 📄 Single/Batch PDF text extraction
- 📋 Copy extracted text to clipboard
- 💾 Download text as `.txt` files
- 📊 Process history tracking
- 🌓 Light/Dark theme support
- 📱 Responsive design
- 📈 Real-time progress tracking

## 🏗️ Source Code Structure

```
src/
├── app/                      # Next.js pages and layouts
│   └── result/
│       └── page.test.tsx     # Vitest example
│
├── components/               # Reusable UI components
│
├── hooks/                    # Custom React hooks
│   └── useFileProcessing.ts  # PDF processing logic
│
├── store/                    # Zustand for state management
│   └── file-history-store.ts # Manages the state of processed file history
│
└── utils/                    # Utility functions
    └── file-utils.ts

cypress/
└── e2e/                      # End-to-end tests
    └── *.cy.ts
```

## Tech Stack

- React.js
- Next.js
- TypeScript
- Tailwind CSS
- Zustand for state management
- HeroUI for UI components
- Vitest for component testing
- Cypress for end-to-end testing

## Getting started

- `npm install` Install the dependencies
- `npm run dev` Run the server for development
- `npm run test` Run component tests using Vitest
- `npm run e2e` Run end-to-end tests using Cypress
- `npm run build` Build the product for production

## Similar projects

- [pdf-to-markdown](https://github.com/jzillmann/pdf-to-markdown)
