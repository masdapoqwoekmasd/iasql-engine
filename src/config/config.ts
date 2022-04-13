export interface ConfigInterface {
  port: number;
  dbHost: string;
  dbUser: string;
  dbPassword: string;
  dbPort: number;
  dbForceSSL: boolean;
  a0Enabled: boolean;
  a0Domain?: string;
  a0Audience?: string;
  sentryEnabled: boolean;
  sentryEnvironment?: string;
  sentryDsn?: string;
  debugLogger?: boolean;
  testLogger?: boolean;
};

export const throwError = (message: string): never => { throw new Error(message); };