import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { cloudId } from '../../../../services/cloud-id';
import { SecurityGroup } from '../../aws_security_group/entity';
import { AvailabilityZone } from '../../aws_vpc/entity';
import { ParameterGroup } from './parameter_group';

@Entity()
export class RDS {
  @PrimaryGeneratedColumn()
  id?: number;

  // TODO: add constraints
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-rds/interfaces/createdbinstancecommandinput.html#dbinstanceidentifier
  @Column({
    unique: true,
  })
  @cloudId
  dbInstanceIdentifier: string;

  // TODO: Add constraints? range vary based on storage type and engine
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-rds/interfaces/createdbinstancecommandinput.html#allocatedstorage
  @Column({
    type: 'int',
  })
  allocatedStorage: number;

  @ManyToOne(() => AvailabilityZone, { eager: true, nullable: false })
  @JoinColumn({
    name: 'availability_zone',
  })
  availabilityZone: AvailabilityZone;

  // TODO: make this an entity eventually?
  // @ManyToOne(() => DBInstanceClass, { eager: true, })
  // @JoinColumn({
  //   name: 'db_instance_class_id',
  // })
  @Column()
  dbInstanceClass: string;

  @Column()
  engine: string;

  // ? How to handle this? It is used just for creation and if an update is needed. After creation / update the value is removed from db
  // TODO: Apply constraints?
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-rds/interfaces/createdbinstancecommandinput.html#masteruserpassword
  @Column({
    nullable: true,
  })
  masterUserPassword?: string;

  // TODO: Apply constraints?
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-rds/interfaces/createdbinstancecommandinput.html#masterusername
  @Column({
    nullable: true,
  })
  masterUsername?: string;

  // TODO rename table
  @ManyToMany(() => SecurityGroup, { eager: true })
  @JoinTable({
    name: 'rds_security_groups',
  })
  vpcSecurityGroups: SecurityGroup[];

  // TODO: make this an entity eventually?
  @Column({
    nullable: true,
  })
  endpointAddr?: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  endpointPort?: number;

  @Column({
    nullable: true,
  })
  endpointHostedZoneId?: string;

  @Column({
    type: 'int',
    default: 1,
  })
  backupRetentionPeriod: number;

  @ManyToOne(() => ParameterGroup, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({
    name: 'parameter_group_name',
  })
  parameterGroup?: ParameterGroup;
}
