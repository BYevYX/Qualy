import { StatusType } from '@qualy/front-share/types';

export class ActionError extends Error {
  public type: Exclude<StatusType, 'success'> = 'error';

  constructor(message: string, type?: Exclude<StatusType, 'success'>) {
    super(message);

    if (type) {
      this.type = type;
    }
  }
}
