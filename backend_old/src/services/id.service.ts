import { injectable } from 'inversify';
import { v4 as uuid } from 'uuid';

@injectable()
export class IdService {
  generate(): string {
    return uuid();
  }
}
