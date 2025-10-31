# 🚀 Sitemap Quick Start

## ✅ What's Been Set Up

Your B1T1 Coffee website is now ready for Google Search indexing!

### Files Created:

1. **`next-sitemap.config.js`** - Sitemap configuration
2. **`public/sitemap.xml`** - Auto-generated sitemap (7 pages)
3. **`public/robots.txt`** - Search engine instructions
4. **`SITEMAP-SETUP.md`** - Complete documentation

### Package Installed:

- `next-sitemap` (dev dependency)

## 🎯 Next Steps

### 1. Update Your Domain (Important!)

Edit `next-sitemap.config.js` and change:

```javascript
siteUrl: process.env.SITE_URL || "https://b1t1takeawaycoffee.com",
```

Or create `.env.local` with:

```env
SITE_URL=https://your-actual-domain.com
```

### 2. Rebuild (If You Changed Domain)

```bash
npm run build
```

### 3. Deploy Your Website

Deploy to your hosting provider (Vercel, Netlify, etc.)

### 4. Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add and verify your property
3. Submit sitemap: `https://your-domain.com/sitemap.xml`
4. Request indexing for key pages

## 📝 Pages in Your Sitemap

✅ All pages are included except:

- `/secret` (admin tools)
- `/link-preview` (preview page)

Priority ranking:

- **Homepage** (Priority 1.0) - Updated daily
- **Menu & Stores** (Priority 0.9) - Updated weekly
- **Contact** (Priority 0.8) - Updated monthly
- **About** (Priority 0.7) - Updated monthly

## 🔄 How It Works

Every time you run `npm run build`, the sitemap automatically regenerates with:

- Current date/time stamps
- All public pages
- Proper priorities and change frequencies

## 📱 Verify Installation

After deploying, check these URLs work:

- `https://your-domain.com/sitemap.xml` ✓
- `https://your-domain.com/robots.txt` ✓

## 💡 Tips

- Google typically indexes new sites within 1-4 weeks
- Monitor progress in Google Search Console
- Update your sitemap whenever you add new pages
- Use `npm run build` before each deployment

## 🆘 Need Help?

See the full documentation in `SITEMAP-SETUP.md`

---

**Ready to go live!** Deploy your site and submit to Google Search Console. 🎉
