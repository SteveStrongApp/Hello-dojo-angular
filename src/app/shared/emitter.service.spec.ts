import { async, TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { EmitterService, Toast } from "./emitter.service";

class localTarget {
  doOpen() {
    console.log('doOpen is called')
  }
  doDisplay(type, title, message, done?) {
    console.log('doDisplay is called')
    done && done();
  }
}

describe("emitter Service", () => {
  let popupMessage = {
    message: "the message",
    title: "the title"
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it("should processCommands for registerCommand", done => {
    let test = new localTarget();
    EmitterService.registerCommand(test, "open", test.doOpen);

    EmitterService.processCommands(test,(result) => {
        expect(result).toBeTruthy();
        done();
      }
    );
    EmitterService.broadcastCommand(test,'open')
  });

  it("should NOT processCommands for UN registerCommand", done => {
    let test = new localTarget();
    //EmitterService.registerCommand(test, "open", test.doOpen);

    EmitterService.processCommands(test,(result) => {
        expect(result).toBeFalsy();
        done();
      }
    );
    EmitterService.broadcastCommand(test,'open')
  });



  it("should broadcastCommand", () => {
    let test = new localTarget();
    const result = EmitterService.broadcastCommand(test, "open");
    expect(result).toBeTruthy();
  });

  it("should registerCommand", () => {
    let test = new localTarget();
    let name = EmitterService.registerCommand(test, "open", test.doOpen);
    expect(name).toBeTruthy();
  });

  it("should displayToastUsing", (done) => {
    let test = new localTarget();
    let result = EmitterService.displayToastUsing(test, test.doDisplay, done);
    expect(result).toBeTruthy();
    done();
  });

  it("should do Popup Error", () => {
    let test = new localTarget();
    EmitterService.displayToastUsing(test, test.doDisplay);

    let result = Toast.error(popupMessage.message, popupMessage.title);
    expect(result).toEqual(popupMessage);
  });

  it("should do Popup Warning", () => {
    let test = new localTarget();
    EmitterService.displayToastUsing(test, test.doDisplay);

    let result = Toast.warning(popupMessage.message, popupMessage.title);
    expect(result).toEqual(popupMessage);
  });

  it("should do Popup Success", () => {
    let test = new localTarget();
    EmitterService.displayToastUsing(test, test.doDisplay);

    let result = Toast.success(popupMessage.message, popupMessage.title);
    expect(result).toEqual(popupMessage);
  });

  it("should do Popup Info", () => {
    let test = new localTarget();
    EmitterService.displayToastUsing(test, test.doDisplay);

    let result = Toast.info(popupMessage.message, popupMessage.title);
    expect(result).toEqual(popupMessage);
  });


});
