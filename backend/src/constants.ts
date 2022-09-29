export const isProduction = process.env.NODE_ENV === 'production';
export const isDebug = !isProduction;

const corsOrigins = ['http://localhost:4200'];

if (isDebug) {
  corsOrigins.push('chrome-extension://ophmdkgfcjapomjdpfobjfbihojchbko'); // Socket.io Test Client Chrome extension
}

export const CORS_ORIGIN = corsOrigins;
