import rateLimit from "express-rate-limit";

// Rate limiter untuk login (ketat)
export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 menit
  max: 5, // Maksimum 5 permintaan
  message: {
    status: false,
    message: "Terlalu banyak percobaan login, coba lagi nanti.",
  },
});

// Rate limiter untuk register (agak ketat)
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 jam
  max: 5, // Maksimum 5 permintaan
  message: {
    status: false,
    message: "Terlalu banyak percobaan registrasi, coba lagi nanti.",
  },
});

// Rate limiter untuk refresh token (sedang)
export const refreshTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 30, // Maksimum 30 permintaan
  message: {
    status: false,
    message: "Terlalu banyak permintaan refresh token, coba lagi nanti.",
  },
});


export const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 100, // Maksimum 100 permintaan per menit
  message: {
    success: false,
    message: "Terlalu banyak permintaan, coba lagi nanti.",
  },
});


