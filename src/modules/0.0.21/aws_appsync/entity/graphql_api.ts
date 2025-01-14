import { Column, Entity, PrimaryColumn } from 'typeorm';

import { cloudId } from '../../../../services/cloud-id';

export enum AuthenticationType {
  AMAZON_COGNITO_USER_POOLS = 'AMAZON_COGNITO_USER_POOLS',
  API_KEY = 'API_KEY',
  AWS_IAM = 'AWS_IAM',
  AWS_LAMBDA = 'AWS_LAMBDA',
  OPENID_CONNECT = 'OPENID_CONNECT',
}

export enum DefaultAction {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
}

@Entity()
export class GraphqlApi {
  @PrimaryColumn({
    nullable: false,
    type: 'varchar',
  })
  @cloudId
  name: string;

  @Column({
    nullable: true,
  })
  apiId: string;

  @Column({
    nullable: true,
  })
  arn: string;

  @Column({
    type: 'enum',
    enum: AuthenticationType,
  })
  authenticationType: AuthenticationType;

  @Column({
    type: 'json',
    nullable: true,
  })
  lambdaAuthorizerConfig?: {
    authorizerResultTtlInSeconds: number | undefined;
    authorizerUri: string | undefined;
    identityValidationExpression: string | undefined;
  };

  @Column({
    type: 'json',
    nullable: true,
  })
  openIDConnectConfig?: {
    authTtl: number | undefined;
    clientId: string | undefined;
    iaTtl: number | undefined;
    issuer: string | undefined;
  };

  @Column({
    type: 'json',
    nullable: true,
  })
  userPoolConfig?: {
    appIdClientRegex: string | undefined;
    awsRegion: string | undefined;
    defaultAction: DefaultAction | undefined;
    userPoolId: string | undefined;
  };

  // This column is joined to `aws_regions` manually via hooks in the `../sql` directory
  @Column({
    type: 'character varying',
    nullable: false,
    default: () => 'default_aws_region()',
  })
  region: string;
}
