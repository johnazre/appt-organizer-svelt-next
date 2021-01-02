import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private apptRepository: Repository<Appointment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Appointment[]> {
    return this.apptRepository.find();
  }

  findOne(id: string): Promise<Appointment> {
    return this.apptRepository.findOne(id);
  }

  async createOne(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    console.log('cad', createAppointmentDto);
    const newAppt = this.apptRepository.create(createAppointmentDto);
    newAppt.withUser = await this.userRepository.findOne(
      //@ts-ignore
      createAppointmentDto.withUser,
    );
    return this.apptRepository.save(newAppt);
  }

  async updateOne(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    console.log('uad', updateAppointmentDto);

    let updatedAppt = await this.apptRepository.findOne(id);

    updatedAppt.withUser = await this.userRepository.findOne(
      // @ts-ignore
      updateAppointmentDto.withUser.id
        ? // @ts-ignore
          updateAppointmentDto.withUser.id
        : // @ts-ignore
          updateAppointmentDto.withUser,
    );
    updatedAppt.reason = updateAppointmentDto.reason;
    updatedAppt.date = updateAppointmentDto.date;
    updatedAppt.updatedAt = new Date();

    console.log('updatedAppt', updatedAppt);
    return this.apptRepository.save(updatedAppt);
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
