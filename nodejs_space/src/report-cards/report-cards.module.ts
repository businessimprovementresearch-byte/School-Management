import { Module } from '@nestjs/common';
import { ReportCardsController } from './report-cards.controller';
import { ReportCardsService } from './report-cards.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [ReportCardsController],
  providers: [ReportCardsService],
})
export class ReportCardsModule {}
