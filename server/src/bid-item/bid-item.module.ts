import { Module } from '@nestjs/common';
import { BidItemController } from './bid-item.controller';
import { BidItemService } from './bid-item.service';
import { BidItemGateway } from './bid-item.gateway';

@Module({
  controllers: [BidItemController],
  providers: [BidItemService, BidItemGateway],
})
export class BidItemModule {}
