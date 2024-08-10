import { Module } from '@nestjs/common';
import { BidderController } from './bidder.controller';
import { BidderService } from './bidder.service';

@Module({
  controllers: [BidderController],
  providers: [BidderService]
})
export class BidderModule {}
