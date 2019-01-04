import {InstanceStateEnum} from './instance-state-enum.enum';


export class Instance {
  private _state: InstanceStateEnum;
  private _instanceUuid: string;


  constructor(state: InstanceStateEnum, instanceUuid: string) {
    this._state = state;
    this._instanceUuid = instanceUuid;
  }


  get state(): InstanceStateEnum {
    return this._state;
  }

  get instanceUuid(): string {
    return this._instanceUuid;
  }
}
