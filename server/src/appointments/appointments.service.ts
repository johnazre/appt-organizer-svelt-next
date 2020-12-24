import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private apptRepository: Repository<Appointment>,
  ) {}

  findAll(): Promise<Appointment[]> {
    return this.apptRepository.find();
  }

  findOne(id: string): Promise<Appointment> {
    return this.apptRepository.findOne(id);
  }

  createOne(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.apptRepository.save(createAppointmentDto);
  }

  async updateOne(
    id: string,
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<boolean> {
    try {
      await this.apptRepository.update(id, createAppointmentDto);
      return true;
    } catch (err) {
      return false;
    }
  }

  async removeOne(id: string): Promise<boolean> {
    try {
      await this.apptRepository.delete(id);
      return true;
    } catch (err) {
      return false;
    }
  }
}
