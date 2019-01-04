import {Component, OnInit} from '@angular/core';
import {CfcStateServiceService} from './cfc-state-service.service';
import {StepFunction} from './step-function';
import {CloudProvider} from './cloud-provider.enum';
import {Instance} from './instance';
import {InstanceStateEnum} from './instance-state-enum.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cfc-explorer';
  stepFunctions = [];
  syncing = false;
  syncButton = 'Start syncing';
  instancesButton = 'Show instances';
  JSON = JSON;
  Math = Math;

  instancesButtonPress() {
    if ('Show instances' === this.instancesButton) {
      this.instancesButton = 'Show metrics';
    } else {
      this.instancesButton = 'Show instances';
    }
  }

  syncButtonPress() {
    this.syncing = !this.syncing;
    if (this.syncing) {
      this.syncButton = 'Stop syncing';
      this.refreshFunctions();
    } else {
      this.syncButton = 'Start syncing';
    }
  }

  constructor(private cfcStateService: CfcStateServiceService) {

  }

  ngOnInit() {
  }

  private refreshFunctions() {
    const startTime = new Date().getTime();
    this.cfcStateService.getFunctions()
      .subscribe((stepFunctions) => {
        const newStepFunctions: Array<StepFunction> = [];
        stepFunctions.forEach(stepFunction => {
          const receivedStepFunction: any = (<any> stepFunction);
          const warmInstances: Array<Instance> = [];
          let busyInstances = 0;
          receivedStepFunction.warmInstances.forEach(instance => {
            let state = InstanceStateEnum.IDLE;
            if (instance.state === 1) {
              state = InstanceStateEnum.BUSY;
              busyInstances++;
            }
            warmInstances.push(new Instance(state,
              instance.instanceUuid));
          });
          const newStepFunction = new StepFunction(receivedStepFunction.functionName,
            (receivedStepFunction.provider === 'aws' ? CloudProvider.AWS : CloudProvider.OPEN_WHISK),
            receivedStepFunction.averageWarmMetrics,
            receivedStepFunction.averageColdMetrics,
            warmInstances, busyInstances);
          newStepFunctions.push(newStepFunction);
        });
        this.stepFunctions = newStepFunctions;
        // console.log(this.stepFunctions);
        const responseTime = new Date().getTime();
        if (this.syncing) {
          setTimeout(() => {
            this.refreshFunctions();
          }, responseTime - startTime);
        }
      });
  }
}
