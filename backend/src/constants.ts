export const isProduction = process.env.NODE_ENV === 'production';
export const isDebug = !isProduction;

let corsOrigins = [isDebug ? 'http://localhost:4200' : 'https://smudgy-api.onrender.com'];

if (process.env.CORS_ORIGINS) {
  corsOrigins = JSON.parse(process.env.CORS_ORIGINS);
}

if (isDebug) {
  corsOrigins.push('chrome-extension://ophmdkgfcjapomjdpfobjfbihojchbko'); // Socket.io Test Client Chrome extension
}

export const CORS_ORIGIN = corsOrigins;
