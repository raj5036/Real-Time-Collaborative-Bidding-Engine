import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BidItemModule } from './bid-item/bid-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule, 
    AuthModule, 
    PrismaModule, BidItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
