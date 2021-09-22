import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from 'typeorm';

import { AvailabilityZone, } from './availability_zone';

@Entity()
export class AvailabilityZoneMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AvailabilityZone)
  @JoinColumn({
    name: 'availability_zone_id',
  })
  availabilityZone: AvailabilityZone;

  @Column()
  message: string;
}
