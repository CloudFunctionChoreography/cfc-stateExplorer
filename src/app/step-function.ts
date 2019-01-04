import {Instance} from './instance';
import {CloudProvider} from './cloud-provider.enum';

export class StepFunction {
  private _functionName: string;
  private _provider: CloudProvider;
  private _instances: Array<Instance>;
  private warmMetrics;
  private coldMetrics;
  private busyInstances: number;

  constructor(functionName: string, provider: CloudProvider, warmMetrics, coldMetrics, instances: Array<Instance>, busyInstances: number) {
    this._functionName = functionName;
    this._instances = instances;
    this._provider = provider;
    this.warmMetrics = warmMetrics;
    this.coldMetrics = coldMetrics;
    this.busyInstances = busyInstances;
  }


  get functionName(): string {
    return this._functionName;
  }

  get provider(): string {
    return this._provider === CloudProvider.AWS ? 'AWS' : 'OpenWhisk';
  }

  get instances(): Array<Instance> {
    return this._instances;
  }
}
