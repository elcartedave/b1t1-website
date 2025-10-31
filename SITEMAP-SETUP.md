# Sitemap & Google Search Console Setup Guide

## 📋 What Was Created

Your B1T1 Coffee website now has:

1. ✅ **`next-sitemap.config.js`** - Configuration file for sitemap generation
2. ✅ **`public/sitemap.xml`** - XML sitemap with all your pages
3. ✅ **`public/robots.txt`** - Robots file that tells search engines how to crawl your site

## 🌐 Update Your Domain

Before submitting to Google, update the domain in `next-sitemap.config.js`:

```javascript
siteUrl: process.env.SITE_URL || 'https://yourdomain.com', // Replace with your actual domain
```

Or create a `.env.local` file in the root directory:

```env
SITE_URL=https://yourdomain.com
```

## 🚀 How to Submit to Google Search Console

### Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click "Add Property"

### Step 2: Verify Your Website

Choose one of the verification methods:

- **Domain** (Recommended): Verify via DNS
- **URL Prefix**: Verify via HTML file upload, HTML tag, Google Analytics, or Google Tag Manager

### Step 3: Submit Your Sitemap

1. Once verified, go to **Sitemaps** in the left sidebar
2. Enter your sitemap URL: `https://yourdomain.com/sitemap.xml`
3. Click **Submit**

### Step 4: Request Indexing

1. Go to **URL Inspection** in the left sidebar
2. Enter your homepage URL: `https://yourdomain.com`
3. Click **Request Indexing**
4. Repeat for important pages like `/menu`, `/stores`, `/contact`

## 📊 Sitemap Configuration

Your sitemap includes these pages with custom priorities:

| Page            | Priority | Change Frequency |
| --------------- | -------- | ---------------- |
| `/` (Home)      | 1.0      | Daily            |
| `/menu`         | 0.9      | Weekly           |
| `/stores`       | 0.9      | Weekly           |
| `/contact`      | 0.8      | Monthly          |
| `/about`        | 0.7      | Monthly          |
| `/soon-to-open` | 0.6      | Weekly           |
| `/coming-soon`  | 0.5      | Monthly          |

**Excluded pages:** `/secret`, `/link-preview`

## 🔄 Regenerating the Sitemap

The sitemap is automatically generated every time you build your project:

```bash
npm run build
```

This runs the `postbuild` script which executes `next-sitemap`.

## 🤖 Robots.txt

Your `robots.txt` file:

- Allows all search engines to crawl your site
- Blocks `/secret` and `/link-preview` pages
- Points to your sitemap location

## 📱 Verify Your Sitemap

After deploying, verify your sitemap is accessible:

- Visit: `https://yourdomain.com/sitemap.xml`
- Visit: `https://yourdomain.com/robots.txt`

## 🛠 Customization Options

### Change Sitemap Settings

Edit `next-sitemap.config.js` to:

- Add/remove excluded pages
- Modify priority and change frequency
- Add multiple sitemaps
- Configure robots.txt policies

### Example: Add More Excluded Pages

```javascript
exclude: ['/secret', '/link-preview', '/admin', '/dashboard'],
```

## 📈 Monitoring

After submitting to Google Search Console, you can:

1. Monitor indexing status
2. View search performance
3. Check for crawl errors
4. See which pages are indexed
5. Analyze search queries

**Note:** It may take a few days to several weeks for Google to fully index your site.

## 🔗 Additional SEO Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)
- [Sitemap Protocol](https://www.sitemaps.org/)

## ✅ Checklist

Before submitting to Google:

- [ ] Update domain in `next-sitemap.config.js` or `.env.local`
- [ ] Build the project: `npm run build`
- [ ] Deploy your website
- [ ] Verify sitemap is accessible at `/sitemap.xml`
- [ ] Verify robots.txt is accessible at `/robots.txt`
- [ ] Create Google Search Console account
- [ ] Verify website ownership
- [ ] Submit sitemap
- [ ] Request indexing for key pages

---

## 🎯 Quick Command Reference

```bash
# Install dependencies (already done)
npm install --save-dev next-sitemap --legacy-peer-deps

# Build and generate sitemap
npm run build

# Start development server
npm run dev

# Deploy (depends on your hosting provider)
npm run start
```

Good luck with your SEO! 🚀
