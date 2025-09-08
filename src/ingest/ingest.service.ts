import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { tryParseJSON5 } from '../utils/json5';
import slugify from 'slugify';

type Chunk = { path?: string; content: string };

@Injectable()
export class IngestService {
  constructor(private prisma: PrismaService) {}

  private splitFiles(blob: string): Chunk[] {
    const parts = blob.split(/===\s*FILE:\s*(.*?)\s*===/g);
    if (parts.length <= 1) return [{ content: blob }];
    const chunks: Chunk[] = [];
    for (let i = 1; i < parts.length; i += 2) {
      chunks.push({ path: parts[i].trim(), content: parts[i+1] || '' });
    }
    return chunks;
  }

  private extractArray(content: string, varName: string): any[] {
    // find `const varName = [ ... ];` or `export const varName = [ ... ];`
    const re = new RegExp(`(?:const|export\\s+const)\\s+${varName}\\s*=\\s*\\[([\\s\\S]*?)\\]`, 'm');
    const m = content.match(re);
    if (!m) return [];
    const jsonText = `[${m[1]}]`.replace(/(\w+)\s*:/g, '"$1":').replace(/'/g, '"');
    const parsed = tryParseJSON5(jsonText);
    return Array.isArray(parsed) ? parsed : [];
  }

  private extractObject(content: string, varName: string): any {
    const re = new RegExp(`(?:const|export\\s+const)\\s+${varName}\\s*=\\s*\\{([\\s\\S]*?)\\}`, 'm');
    const m = content.match(re);
    if (!m) return null;
    const jsonText = `{${m[1]}}`.replace(/(\w+)\s*:/g, '"$1":').replace(/'/g, '"');
    return tryParseJSON5(jsonText);
  }

  private extractBlogFromBlogPostPage(content: string) {
    // BlogPostPage.tsx contains a `const blogPost = { ... }`
    const obj = this.extractObject(content, 'blogPost');
    if (!obj) return [];
    return [obj];
  }

  private async upsertCompanyInfoFromContact(content: string) {
    // ContactPage.tsx has phone/email/coverage hours and company data block
    const phoneMatch = content.match(/tel:(\d+)/);
    const emailMatch = content.match(/mailto:([^\"]+)/);
    const coverageMatch = content.match(/areaServed":\s*\[(.*?)\]/s);
    const areas = coverageMatch
      ? coverageMatch[1].replace(/"/g, '').split(',').map(s => s.trim())
      : ['Hampshire','Surrey','Sussex','Dorset','Wiltshire'];

    await this.prisma.companyInfo.upsert({
      where: { id: 1 },
      update: {
        phone: phoneMatch?.[1] || '03330040195',
        email: emailMatch?.[1] || 'office@evohomeimprovements.co.uk',
        coverageAreas: areas,
        name: 'EvoHome Improvements Ltd'
      },
      create: {
        id: 1,
        name: 'EvoHome Improvements Ltd',
        phone: phoneMatch?.[1] || '03330040195',
        email: emailMatch?.[1] || 'office@evohomeimprovements.co.uk',
        coverageAreas: areas
      }
    });
  }

  private extractHeroSlides(content: string) {
    // PremiumHero.tsx has: const heroSlides = [ ... ]
    return this.extractArray(content, 'heroSlides');
  }

  private extractTrustPointsFromRequestQuote(content: string) {
    // RequestQuotePage.tsx has const trustPoints = [ ... ], processSteps = [...]
    const trustPoints = this.extractArray(content, 'trustPoints');
    const processSteps = (() => {
      const re = /const\s+processSteps\s*=\s*\[([\s\S]*?)\]/m;
      const m = content.match(re);
      if (!m) return [];
      const jsonText = `[${m[1]}]`.replace(/'/g, '"');
      const arr = tryParseJSON5(jsonText);
      return Array.isArray(arr) ? arr : [];
    })();
    const realTestimonials = this.extractArray(content, 'realTestimonials');
    return { trustPoints, processSteps, realTestimonials };
  }

  private extractGallery(content: string) {
    // GalleryPage.tsx has const galleryImages = [ ... ]
    return this.extractArray(content, 'galleryImages');
  }

  private extractChatbot(content: string) {
    // SmartChatbot.tsx contains a canned responses object
    const re = /const\s+responses\s*=\s*\{([\s\S]*?)\}\s*;/m;
    const m = content.match(re);
    let canned: any = {};
    if (m) {
      const jsonText = `{${m[1]}}`.replace(/(\w+)\s*:/g, '"$1":').replace(/'/g, '"');
      canned = tryParseJSON5(jsonText) || {};
    }
    // quickActions (array of {text, action})
    const qa = this.extractArray(content, 'quickActions').map((q: any) => q.text);
    return { quickActions: qa, cannedReplies: canned };
  }

  async run(blob: string) {
    const chunks = this.splitFiles(blob);

    // Wipe content (do not wipe leads or admin users)
    await this.prisma.$transaction([
      this.prisma.navigationItem.deleteMany(),
      this.prisma.seoRecord.deleteMany(),
      this.prisma.galleryImage.deleteMany(),
      this.prisma.testimonial.deleteMany(),
      this.prisma.heroSlide.deleteMany(),
      this.prisma.trustSignal.deleteMany(),
      this.prisma.requestQuoteSettings.deleteMany(),
      this.prisma.blogPost.deleteMany(),
      this.prisma.county.deleteMany(),
      this.prisma.service.deleteMany(),
    ]);

    let servicesLoaded = 0, countiesLoaded = 0, postsLoaded = 0, galleryLoaded = 0;

    for (const ch of chunks) {
      const c = ch.content;

      // Company info from ContactPage.tsx
      if ((ch.path||'').includes('ContactPage.tsx')) {
        await this.upsertCompanyInfoFromContact(c);
      }

      // Services from src/data/services.ts  (if provided elsewhere it still catches)
      if (/services\s*=\s*\[/.test(c)) {
        const arr = this.extractArray(c, 'services');
        for (const s of arr) {
          await this.prisma.service.create({
            data: {
              name: s.name,
              slug: s.slug || slugify(s.name, { lower: true, strict: true }),
              category: s.category || 'general',
              image: s.image || null,
              description: s.description || null,
              longDescription: s.longDescription || null,
              averageSavings: s.averageSavings || null,
              installTime: s.installTime || null,
              warranty: s.warranty || null,
              benefits: s.benefits || [],
              whatIsIt: s.whatIsIt || null,
              whyChooseContent: s.whyChooseContent || null,
              howEvoHomeHelpsContent: s.howEvoHomeHelpsContent || null,
              howItWorksSteps: s.howItWorksSteps || null,
              comparisonTable: s.comparisonTable || null,
              serviceTypes: s.serviceTypes || null,
              materials: s.materials || null,
              relatedArticles: s.relatedArticles || null,
              externalResources: s.externalResources || null,
            }
          });
          servicesLoaded++;
        }
      }

      // Counties
      if (/counties\s*=\s*\[/.test(c)) {
        const arr = this.extractArray(c, 'counties');
        for (const x of arr) {
          await this.prisma.county.create({
            data: {
              name: x.name, slug: x.slug || slugify(x.name, { lower: true, strict: true }),
              description: x.description || null, isPrimary: !!x.isPrimary
            }
          });
          countiesLoaded++;
        }
      }

      // Gallery
      if ((ch.path||'').includes('GalleryPage.tsx')) {
        const imgs = this.extractGallery(c);
        let i = 0;
        for (const g of imgs) {
          await this.prisma.galleryImage.create({
            data: { src: g.src, alt: g.alt || g.title || '', category: g.category || null, title: g.title || null, order: i++ }
          });
          galleryLoaded++;
        }
      }

      // Blog single from BlogPostPage.tsx
      if ((ch.path||'').includes('BlogPostPage.tsx')) {
        const posts = this.extractBlogFromBlogPostPage(c);
        for (const p of posts) {
          await this.prisma.blogPost.create({
            data: {
              title: p.title,
              slug: slugify(p.title, { lower: true, strict: true }),
              excerpt: p.excerpt || null,
              content: p.content,
              date: new Date(p.date || Date.now()),
              author: p.author || 'EvoHome Team',
              category: p.category || null,
              image: p.image || null,
            }
          });
          postsLoaded++;
        }
      }

      // PremiumHero slides & trust signals line in PremiumHero.tsx
      if ((ch.path||'').includes('PremiumHero.tsx')) {
        const slides = this.extractHeroSlides(c);
        let i = 0;
        for (const s of slides) {
          await this.prisma.heroSlide.create({ data: { image: s.image, title: s.title, subtitle: s.subtitle || null, order: i++ } });
        }
        // Trust signals are literal lines; create default four:
        await this.prisma.trustSignal.createMany({
          data: [
            { icon: 'CheckCircle', label: '30+ Years Experience', order: 0 },
            { icon: 'Star', label: '4.9/5 Google Rating', order: 1 },
            { icon: 'Shield', label: '100% Protected', order: 2 },
            { icon: 'Users', label: 'Vetted Specialists', order: 3 },
          ]
        });
      }

      // RequestQuotePage.tsx → trustPoints, processSteps, testimonials
      if ((ch.path||'').includes('RequestQuotePage.tsx')) {
        const { trustPoints, processSteps, realTestimonials } = this.extractTrustPointsFromRequestQuote(c);
        await this.prisma.requestQuoteSettings.upsert({
          where:{ id:1 },
          update:{ processSteps, trustPoints, testimonials: realTestimonials },
          create:{ id:1, processSteps, trustPoints, testimonials: realTestimonials }
        });
        for (const t of realTestimonials || []) {
          await this.prisma.testimonial.create({
            data: {
              name: t.name, date: new Date(t.date), rating: t.rating, text: t.text,
              service: t.service || null, savings: t.savings || null
            }
          });
        }
      }

      // SmartChatbot.tsx canned replies + quick actions
      if ((ch.path||'').includes('SmartChatbot.tsx')) {
        const { quickActions, cannedReplies } = this.extractChatbot(c);
        await this.prisma.chatbotConfig.upsert({
          where: { id: 1 },
          update: { quickActions, cannedReplies },
          create: { id: 1, quickActions, cannedReplies }
        });
      }

      // SEO per page (we’ll set from Helmet titles where easy — optional)
      // You can add specific extractors similarly for ServicesPage.tsx/JoinEvoHomePage.tsx/ThankYouPage.tsx
    }

    return {
      ok: true,
      counts: { servicesLoaded, countiesLoaded, postsLoaded, galleryLoaded },
      message: 'Imported core content. You can refine everything in /admin now.'
    };
  }
}
