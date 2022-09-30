import { ValidationError } from '@nestjs/common';
import { Injectable, ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class GatewayValidationPipe extends ValidationPipe {
  constructor() {
    super({ transform: true });
  }

  createExceptionFactory(): (validationErrors?: ValidationError[]) => unknown {
    return validationErrors => {
      if (this.isDetailedOutputDisabled || !validationErrors) {
        return new WsException('');
      }

      const errors = this.flattenValidationErrors(validationErrors);
      return new WsException(errors);
    };
  }
}
