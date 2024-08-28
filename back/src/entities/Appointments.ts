

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum AppointmentStatus {
  ACTIVE = "active",
  CANCELLED = "cancelled",
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  userId: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.ACTIVE,
  })
  status: AppointmentStatus;
}

export default Appointment;
