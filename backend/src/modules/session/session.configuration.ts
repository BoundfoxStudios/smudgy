import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface SessionConfiguration {
  sessionTimeoutInMinutes: number;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<SessionConfiguration>().build();
