
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Appointment } from "./Appointments";
import { Credential } from "./Credentials";

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 32,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @Column({})
  nDni: number;

  @OneToOne(() => Credential)
  @JoinColumn({ name: "credentials" })
  credentials: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
