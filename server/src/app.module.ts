import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BidItemModule } from './bid-item/bid-item.module';
import { UserActiveBidModule } from './user-active-bid/user-active-bid.module';
import { BidderModule } from './bidder/bidder.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule, 
    AuthModule, 
    PrismaModule, BidItemModule, UserActiveBidModule, BidderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
