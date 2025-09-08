import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/chatbot')
export class ChatbotController {
  constructor(private svc: ChatbotService) {}

  // PUBLIC
  @Get()
  get() { return this.svc.get(); }

  // ADMIN
  @Patch('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR','OWNER')
  update(@Body() dto: any) { return this.svc.update(dto); }
}
