import { CreateDateColumn, Column, Entity, PrimaryColumn } from 'typeorm';

// TODO: Drop once `operation` job is not necessary anymore
export enum IasqlOperationType {
  APPLY = 'APPLY',
  SYNC = 'SYNC',
  INSTALL = 'INSTALL',
  UNINSTALL = 'UNINSTALL',
  PLAN_APPLY = 'PLAN_APPLY',
  PLAN_SYNC = 'PLAN_SYNC',
  LIST = 'LIST',
  UPGRADE = 'UPGRADE',
}

// TODO: Drop once `operation` job is not necessary anymore
@Entity()
export class IasqlOperation {
  @PrimaryColumn({
    type: 'uuid',
  })
  opid: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  startDate: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: IasqlOperationType,
  })
  optype: IasqlOperationType;

  @Column({
    type: 'text',
    array: true,
  })
  params: string[];

  @Column({
    type: 'text',
    nullable: true,
  })
  output: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  err: string;
}

@Entity()
export class IasqlRpc {
  @PrimaryColumn({
    type: 'uuid',
  })
  opid: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  startDate: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  endDate: Date;

  @Column()
  moduleName: string;

  @Column()
  methodName: string;

  @Column({
    type: 'text',
    array: true,
  })
  params: string[];

  @Column({
    type: 'text',
    nullable: true,
  })
  output: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  err: string;
}
