const FIXIT_BRANDS = [
  {
    id: "apple",
    name: "Apple iPhone",
    svg: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 21.49c-1.282.607-2.61.942-3.968.942-1.393 0-2.738-.344-4.013-.97-2.288-1.122-3.826-3.14-4.502-5.46-.867-2.964-.175-6.07 1.84-8.156 1.34-1.385 3.093-2.148 4.97-2.148 1.815 0 3.518.73 4.825 2.053.11.11.213.226.31.346.096-.12.2-.236.31-.346 1.307-1.323 3.01-2.053 4.825-2.053 1.877 0 3.63.763 4.97 2.148 2.015 2.086 2.707 5.192 1.84 8.156-.676 2.32-2.214 4.338-4.502 5.46-1.275.626-2.62.97-4.013.97-1.358 0-2.686-.335-3.968-.942zm-3.968-1.57c1.077 0 2.12-.26 3.08-.755 1.766-.91 2.94-2.433 3.447-4.168.643-2.203.118-4.512-1.383-6.065-1.01-1.045-2.33-1.62-3.737-1.62-1.365 0-2.646.54-3.607 1.517-.37.375-.688.8-.936 1.264-.248-.464-.566-.89-.936-1.264-.96-.977-2.242-1.517-3.607-1.517-1.407 0-2.727.575-3.737 1.62-1.5 1.553-2.026 3.862-1.383 6.065.508 1.735 1.68 3.258 3.447 4.168.96.495 2.003.755 3.08.755z"/></svg>',
  },
  {
    id: "samsung",
    name: "Samsung Galaxy",
    svg: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>',
  },
  {
    id: "google",
    name: "Google Pixel",
    svg: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
  },
];

const FIXIT_CATALOG = {
  apple: [
    {
      name: "iPhone 17",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 450, time: "30 min" },
        { type: "battery", name: "Battery Replacement", price: 90, time: "30 min" },
        { type: "port", name: "Charging Port Replacement", price: 90, time: "45 min" },
      ],
    },
    {
      name: "iPhone 16 / 16 Pro",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 240, time: "30 min" },
        { type: "battery", name: "Battery Replacement", price: 50, time: "30 min" },
        { type: "port", name: "Charging Port Replacement", price: 80, time: "45 min" },
      ],
    },
    {
      name: "iPhone 15 / 15 Pro",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 200, time: "30 min" },
        { type: "battery", name: "Battery Replacement", price: 50, time: "30 min" },
        { type: "port", name: "Charging Port Replacement", price: 80, time: "45 min" },
      ],
    },
    {
      name: "iPhone 14 / 14 Pro",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 150, time: "30 min" },
        { type: "battery", name: "Battery Replacement", price: 50, time: "30 min" },
        { type: "port", name: "Charging Port Replacement", price: 80, time: "45 min" },
      ],
    },
    {
      name: "iPhone 13 / 13 Pro",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 150, time: "30 min" },
        { type: "battery", name: "Battery Replacement", price: 50, time: "30 min" },
        { type: "port", name: "Charging Port Replacement", price: 80, time: "45 min" },
      ],
    },
  ],
  samsung: [
    {
      name: "Galaxy S24 Ultra",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 250, time: "60 min" },
        { type: "battery", name: "Battery Replacement", price: 90, time: "45 min" },
        { type: "port", name: "Charging Port Replacement", price: 100, time: "30 min" },
      ],
    },
    {
      name: "Galaxy S24+ / S24",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 250, time: "60 min" },
        { type: "battery", name: "Battery Replacement", price: 90, time: "45 min" },
        { type: "port", name: "Charging Port Replacement", price: 100, time: "30 min" },
      ],
    },
    {
      name: "Galaxy S23 / S23+ / S23 Ultra",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 200, time: "60 min" },
        { type: "battery", name: "Battery Replacement", price: 50, time: "45 min" },
        { type: "port", name: "Charging Port Replacement", price: 80, time: "30 min" },
      ],
    },
  ],
  google: [
    {
      name: "Pixel 10 Pro",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 200, time: "45 min" },
        { type: "battery", name: "Battery Replacement", price: 40, time: "45 min" },
        { type: "port", name: "Charging Port Replacement", price: 40, time: "60 min" },
      ],
    },
    {
      name: "Pixel 10 (base)",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 150, time: "45 min" },
        { type: "battery", name: "Battery Replacement", price: 40, time: "45 min" },
        { type: "port", name: "Charging Port Replacement", price: 40, time: "60 min" },
      ],
    },
    {
      name: "Pixel 8 / 8 Pro",
      repairs: [
        { type: "screen", name: "Screen Replacement", price: 150, time: "45 min" },
        { type: "battery", name: "Battery Replacement", price: 50, time: "45 min" },
        { type: "port", name: "Charging Port Replacement", price: 150, time: "60 min" },
      ],
    },
  ],
};

module.exports = { FIXIT_BRANDS, FIXIT_CATALOG };
