import { Guid } from 'guid-typescript';

export class GuidGenerator {
    static newGuid() : Guid {
        return Guid.create();
    }
}
