import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UploadsModule } from './uploads/uploads.module';
import { IngestModule } from './ingest/ingest.module';

// content modules
import { CompanyInfoModule } from './modules/company-info/company-info.module';
import { ServicesModule } from './modules/services/services.module';
import { CountiesModule } from './modules/counties/counties.module';
import { BlogPostsModule } from './modules/blog-posts/blog-posts.module';
import { GalleryImagesModule } from './modules/gallery-images/gallery-images.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { FormSubmissionsModule } from './modules/form-submissions/form-submissions.module';
import { SeoModule } from './modules/seo/seo.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { HeroModule } from './modules/hero/hero.module';
import { RequestQuoteModule } from './modules/request-quote/request-quote.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { AdminUsersModule } from './modules/admin-users/admin-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UploadsModule,
    IngestModule,
    CompanyInfoModule,
    ServicesModule,
    CountiesModule,
    BlogPostsModule,
    GalleryImagesModule,
    TestimonialsModule,
    FormSubmissionsModule,
    SeoModule,
    NavigationModule,
    HeroModule,
    RequestQuoteModule,
    ChatbotModule,
    AdminUsersModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
