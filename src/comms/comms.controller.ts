import { Controller, Get, Param } from '@nestjs/common';
import { CommsService } from './comms.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comms')
@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Get('your-next-delivery/:uuid')
  nextDelivery(@Param('uuid') userId: string) {
    return this.commsService.nextDelivery(userId);
  }
  @Get()
  allUsers() {
    return this.commsService.getAllUsers();
  }
}
