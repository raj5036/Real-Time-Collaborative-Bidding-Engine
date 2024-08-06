import { Module } from '@nestjs/common';
import { BidItemController } from './bid-item.controller';
import { BidItemService } from './bid-item.service';

@Module({
  controllers: [BidItemController],
  providers: [BidItemService]
})
export class BidItemModule {}
