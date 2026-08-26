/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Контейнер запускается как `node server.js` — Next должен собрать
  // самодостаточный сервер вместе с трассированными зависимостями.
  output: "standalone",
  images: {
    // У сервиса landing лимит памяти 256 МБ, а оптимизатор Next тянет sharp и
    // даёт скачки памяти на каждой картинке. Скриншоты уже подготовлены под
    // нужный размер (390×844), поэтому отдаём их как есть.
    unoptimized: true,
  },
  experimental: {
    // Keeps the Tabler barrel import from pulling the whole icon set.
    optimizePackageImports: ["@tabler/icons-react"],
  },
};

export default nextConfig;
