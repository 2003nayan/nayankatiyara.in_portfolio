/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/file/d/1q_hYrXA7x3G4H5bRlt4mgGXBHklrfteH/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/file/d/1MS4eBcxi5cykhlhvmX5glI3WmEDmIVaR/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/file/d/1DDH8peNHlUkz9BlWv2XnnOqMBx2np2za/**",
      },
    ],
  },
  // Add transpilePackages to ensure proper loading of modules
  transpilePackages: ["three", "gsap"],
};

export default nextConfig;
