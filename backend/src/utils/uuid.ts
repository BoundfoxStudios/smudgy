import { v4 as uuidv4 } from 'uuid';
import { Guid } from '../models/guid';

export const newUuid = (): Guid => uuidv4();
