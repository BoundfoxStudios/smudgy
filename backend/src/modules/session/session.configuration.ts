export interface SessionConfiguration {
  sessionTimeoutInMinutes: number;
}

export const SESSION_CONFIGURATION = Symbol('SessionConfiguration');
