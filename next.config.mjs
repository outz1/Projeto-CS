/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
		imageSizes: [32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60 * 60 * 24 * 30,
	},
};

export default nextConfig;
