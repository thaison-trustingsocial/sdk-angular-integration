import { Component, OnInit } from '@angular/core';
declare var TVWebSDK: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  tv: any = {};
  ngOnInit() {
    this.title = 'TS SDK Angular demo';
    this.tv = new TVWebSDK.SDK({
      container: document.getElementById("sdk-container"),
      lang: "vi",
      assetRoot: "https://unpkg.com/@tsocial/tvweb-sdk.tcb.bss@5.11.0/assets",
      enableAntiDebug: false,
    });
  }

  onStepDone = (rs: any) => {
    if (rs.stepNumber === 1) {
      this.tv.destroyView();
    }
  }

  onStartID(): void {
    this.tv.readIDCardUIOnly({
      frontCamera: false,
      onSuccess: (output: any) => console.log(output),
      onStepDone: this.onStepDone,
    });
  }

  onStartLiveness(): void {
    this.tv.livenessDetection({
      apiCheck: false,
      mode: 'active',
      onLivenessDetectionDone: () => {this.tv.destroyView();},
      onError: () => {},
    });
  }
}
