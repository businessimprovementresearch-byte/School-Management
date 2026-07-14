import { Module } from '@nestjs/common';
import { AwardsController } from './awards.controller';
import { AwardsService } from './awards.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule {}
