export class CreateAppointmentDto {
  readonly contactName: string;
  readonly date: Date;
  readonly reason: string;
  readonly userId: number;
}
