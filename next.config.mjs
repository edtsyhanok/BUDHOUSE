/** @type {import('next').NextConfig} */
const nextConfig = {
  // Разрешаем локальные домены только при разработке
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: [
      '192.168.1.100:3000',
      '192.168.1.100',
      'macbook-pro.local:3000',
      'macbook-pro.local',
    ],
  }),

  // Отключаем плашку разработки
  devIndicators: false,
};

export default nextConfig;