import { Module } from '@nestjs/common';
import { UserActiveBidController } from './user-active-bid.controller';
import { UserActiveBidService } from './user-active-bid.service';

@Module({
  controllers: [UserActiveBidController],
  providers: [UserActiveBidService]
})
export class UserActiveBidModule {}
