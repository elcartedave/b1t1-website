/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://b1t1takeawaycoffee.com", // Update this with your actual production domain
  generateRobotsTxt: true, // (optional) Generate robots.txt file
  generateIndexSitemap: false, // (optional) Set to true if you have many pages
  exclude: ["/secret", "/link-preview"], // Exclude these pages from sitemap
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/secret", "/link-preview"],
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps if needed
      // 'https://b1t1coffee.com/sitemap-products.xml',
    ],
  },
  // Optional: Add alternates for multiple languages or domains
  // alternateRefs: [
  //   {
  //     href: 'https://b1t1coffee.com',
  //     hreflang: 'en',
  //   },
  // ],
  // Change frequency and priority for different pages
  transform: async (config, path) => {
    // Custom priority and changefreq for specific pages
    const priorityMap = {
      "/": { priority: 1.0, changefreq: "daily" },
      "/menu": { priority: 0.9, changefreq: "weekly" },
      "/stores": { priority: 0.9, changefreq: "weekly" },
      "/about": { priority: 0.7, changefreq: "monthly" },
      "/contact": { priority: 0.8, changefreq: "monthly" },
      "/soon-to-open": { priority: 0.6, changefreq: "weekly" },
      "/coming-soon": { priority: 0.5, changefreq: "monthly" },
    };

    const customSettings = priorityMap[path] || {
      priority: 0.5,
      changefreq: "monthly",
    };

    return {
      loc: path,
      changefreq: customSettings.changefreq,
      priority: customSettings.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
