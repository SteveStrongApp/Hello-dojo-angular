import { Component, OnInit } from "@angular/core";

import { EmitterService, Toast } from "./shared/emitter.service";

import { ConfigService } from "./config.service";
import { environment } from "../environments/environment";

//https://medium.com/@manivel45/angular-7-unit-testing-code-coverage-5c7a238315b6

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  hasConfig = false;

  constructor(private configService: ConfigService) {}

  openToast(type, title, message, done?) {
    const options = {
      toastLife: 3000,
      showCloseButton: true,
      tapToDismiss: true,
      enableHTML: true,
      autoDismiss: false,
      dismiss: "click",
      newestOnTop: true,
      positionClass: "toast-bottom-left" //// "toast-bottom-right"  toast-top-full-width
    };

    setTimeout(_ => {
      console.log("Toast:", type, title, message);
      //this.toastr[type](title, message, options);
      done && done();
    }, 10);
  }

  //https://material.angular.io/components/button/examples

  loadConfiguration(done) {
    this.configService.getConfig$().subscribe((data: any) => {

      Object.keys(data).forEach(key => {
        environment[key] = data[key];
        //console.log(environment[key]);
      });

      this.hasConfig = true;
      done();
    });
  }

  ngOnInit() {
    EmitterService.displayToastUsing(this, this.openToast);

    this.loadConfiguration(() => {
      Toast.info("loaded", "services and feature config");
    });
  }
}
