import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contactName: string;

  @Column()
  date: Date;

  @Column()
  reason: string;
}
