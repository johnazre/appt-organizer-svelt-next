import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly apptsService: AppointmentsService) {}
  @Get()
  findAll(): Promise<Appointment[]> {
    return this.apptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment> {
    return this.apptsService.findOne(id);
  }

  @Post()
  createOne(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.apptsService.createOne(createAppointmentDto);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    console.log('heard in the controller', createAppointmentDto);
    return this.apptsService.updateOne(id, createAppointmentDto);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return this.apptsService.removeOne(id);
  }
}
