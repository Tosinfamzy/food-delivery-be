import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommsModule } from './comms/comms.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
