import { Navbar } from "@/components/Navbar";
import { HeroBackground } from "@/components/HeroBackground";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative min-h-[50dvh] overflow-hidden py-12 md:min-h-[60dvh] md:py-20">
        <HeroBackground />
        
        <div className="relative z-10 container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-background/80 px-4 py-8 text-center shadow-lg backdrop-blur-sm dark:bg-background/50 sm:space-y-8 sm:px-8 sm:py-10">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
              {t('aboutWelcomeTitle')}
            </h2>
            <p className="mb-4 text-base leading-relaxed text-black/90 dark:text-white/90 sm:text-lg">
              {t('aboutParagraph1')}
            </p>
            <p className="mb-4 text-base leading-relaxed text-black/90 dark:text-white/90 sm:text-lg">
              {t('aboutParagraph2')}
            </p>
            <p className="text-base leading-relaxed text-black/90 dark:text-white/90 sm:text-lg">
              {t('aboutParagraph3')}
            </p>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orient-red/5 via-white to-orient-yellow/5 py-12 dark:from-orient-dark dark:via-orient-dark/95 dark:to-orient-dark sm:py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:mb-8 sm:text-3xl">
              {t('followUs')}
            </h2>
            
            <div className="mb-10 flex flex-col flex-wrap justify-center gap-3 sm:mb-12 sm:flex-row sm:gap-6">
              <Button
                asChild
                size="lg"
                className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a 
                  href="https://www.facebook.com/p/Iin-Pizzeria-Orient-Kebab-100046487516056/?locale=fi_FI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a 
                  href="https://www.instagram.com/orientpizzeria/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                className="bg-black hover:bg-black/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a 
                  href="https://www.tiktok.com/@iinpizzeriaorient" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  TikTok
                </a>
              </Button>
            </div>

            <p className="text-gray-600 dark:text-white/80 text-sm mb-12">
              {t('findUs')}
            </p>

            {/* Image Galleries */}
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Facebook Gallery */}
              <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-orient-dark/50 sm:p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                  Facebook
                </h3>
                <div className="relative w-full overflow-x-auto" style={{ minHeight: "min(70vh, 500px)" }}>
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fp%2FIin-Pizzeria-Orient-Kebab-100046487516056%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    width="100%"
                    height="500"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>

              {/* Instagram Gallery */}
              <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-orient-dark/50 sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                  <Instagram className="w-5 h-5 text-[#E4405F]" />
                  Instagram
                </h3>
                <div className="text-center">
                  <blockquote 
                    className="instagram-media" 
                    data-instgrm-permalink="https://www.instagram.com/orientpizzeria/?utm_source=ig_embed&amp;utm_campaign=loading" 
                    data-instgrm-version="14"
                    style={{ 
                      background: '#FFF',
                      border: '0',
                      borderRadius: '3px',
                      boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                      margin: '1px auto',
                      maxWidth: '540px',
                      minWidth: '326px',
                      padding: '0',
                      width: 'calc(100% - 2px)'
                    }}
                  >
                  </blockquote>
                  <script async src="//www.instagram.com/embed.js"></script>
                  <div className="mt-4">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white"
                    >
                      <a 
                        href="https://www.instagram.com/orientpizzeria/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {t('viewInstagram')}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
