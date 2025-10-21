export function Footer() {
  const footerLinks = {
    Company: ["About Us", "Careers", "Press", "Blog"],
    Support: ["Help Center", "Contact Us", "Franchise", "Gift Cards"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="bg-foreground text-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="B1T1 Coffee Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <p className="text-background/80 mb-6 leading-relaxed max-w-sm text-sm md:text-base">
              Experience premium coffee culture with B1T1. Your perfect coffee,
              anytime, anywhere.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#"
                className="px-4 py-2 bg-background/10 hover:bg-primary rounded-full text-sm font-medium transition-colors"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="#"
                className="px-4 py-2 bg-background/10 hover:bg-primary rounded-full text-sm font-medium transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="px-4 py-2 bg-background/10 hover:bg-primary rounded-full text-sm font-medium transition-colors"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-background mb-4 text-sm md:text-base">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-background/80 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-xs md:text-sm">
            © {new Date().getFullYear()} B1T1 Takeaway Coffee. All rights
            reserved.
          </p>
          <p className="text-background/60 text-xs md:text-sm">
            Crafted with love by the B1T1 Team
          </p>
        </div>
      </div>
    </footer>
  );
}
