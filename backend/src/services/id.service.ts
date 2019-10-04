import { injectable } from 'inversify';
import * as uuid from 'uuid/v1';

@injectable()
export class IdService {
  generate(): string {
    return uuid();
  }
}
