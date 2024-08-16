import { Module } from '@nestjs/common';
import { BidderController } from './bidder.controller';
import { BidderService } from './bidder.service';
import { BidderGateway } from './bidder.gateway';

@Module({
  controllers: [BidderController],
  providers: [BidderService, BidderGateway],
})
export class BidderModule {}
