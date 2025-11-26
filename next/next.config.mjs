/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd().replace('/next', ''),
  },
  // images: {
  //   remotePatterns: [{ hostname: process.env.IMAGE_HOSTNAME || 'localhost' }],
  // },
  images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    },
    {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "1337",
      pathname: "/uploads/**",
    },
  ],
},

  pageExtensions: ['ts', 'tsx'],
  async redirects() {
    let redirections = [];
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/redirections`
      );
      const result = await res.json();
      const redirectItems = result.data.map(({ source, destination }) => {
        return {
          source: `/:locale${source}`,
          destination: `/:locale${destination}`,
          permanent: false,
        };
      });

      redirections = redirections.concat(redirectItems);

      return redirections;
    } catch (error) {
      return [];
    }
  },
};

export default nextConfig;
