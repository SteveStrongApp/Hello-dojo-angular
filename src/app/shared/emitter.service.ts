// Credit to https://gist.github.com/sasxa
// Imports
import { Injectable, EventEmitter } from '@angular/core';

// https://scotch.io/tutorials/angular-2-http-requests-with-observables

@Injectable()
export class EmitterService {
  // Event store
  private static _emitters: { [ID: string]: EventEmitter<any> } = {};
  // Set a new event in the store with a given ID
  // as key
  static get(ID: string): EventEmitter<any> {
    if (!this._emitters[ID]) {
      const source = new EventEmitter();
      this._emitters[ID] = source;
    }
    return this._emitters[ID];
  }

  static processCommands(target, done?) {
    EmitterService.get('COMMAND').subscribe(cmd => {
      const { command, args, source } = cmd;
      const name = `cmd${command}`;

      let success = false;
      const funct = target[name];
      if (funct) {
        funct.call(target, args, source);
        success = true;
      }
      done && done(success)
    });
    return target;
  }

  static broadcastCommand(source, command: string, args=[]) {
    const cmd = {
      command,
      args: args,
      source: source
    };
    setTimeout(() => {
      EmitterService.get('COMMAND').emit(cmd);
    }, 10);
    return cmd;
  }

  static registerCommand(source:any, command: string, func) {
    const name = `cmd${command}`;
    source[name] = func;
    return name;
  }

  static displayToastUsing(source, funct, done?) {

    EmitterService.get('SHOWERROR').subscribe(item => {
      funct.call(source, 'error', item.title, item.message);
      done && done()
    });

    EmitterService.get('SHOWWARNING').subscribe(item => {
      funct.call(source, 'warning', item.title, item.message);
      done && done()
    });

    EmitterService.get('SHOWINFO').subscribe(item => {
      funct.call(source, 'info', item.title, item.message);
      done && done()
    });

    EmitterService.get('SHOWSUCCESS').subscribe(item => {
      funct.call(source, 'success', item.title, item.message);
      done && done()
    });
    return source;
  }

}

class PopupToast {

  error(message: string, title?: string) {
    const toast = {
      title: title || '',
      message: message
    };
    EmitterService.get('SHOWERROR').emit(toast);
    return toast;
  }

  warning(message: string, title?: string) {
    const toast = {
      title: title || '',
      message: message
    };
    EmitterService.get('SHOWWARNING').emit(toast);
    return toast;
  }

  success(message: string, title?: string) {
    const toast = {
      title: title || '',
      message: message
    };
    EmitterService.get('SHOWSUCCESS').emit(toast);
    return toast;
  }

  info(message: string, title?: string) {
    const toast = {
      title: title || '',
      message: message
    };
    EmitterService.get('SHOWINFO').emit(toast);
    return toast;
  }
}

export const Toast: PopupToast = new PopupToast();
