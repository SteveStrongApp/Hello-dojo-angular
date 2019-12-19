import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppComponent } from './app.component';
import { ConfigService } from './config.service';

describe('AppComponent', () => {

  let app;
  let fixture;
  let injector: TestBed;
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
 
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers:[ConfigService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(ConfigService);
    httpMock = injector.get(HttpTestingController);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', (done) => {
     expect(app).toBeTruthy();
    done();
  });


  it('should init app', async(() => {
    expect(app.hasConfig).toBeFalsy();

    const data = {
      searchURL: "http://localhost:5000/api"
    }

    app.ngOnInit();
  
    const req = httpMock.expectOne(service.configUrl);
    expect(req.request.method).toBe("GET");
    req.flush(data);
  }));

  it('should Open Toast', (done) => {
    expect(app.openToast).toBeTruthy();
    app.openToast('error','called error ','as expected', done);
  });

  it('should load default configuration', (done) => {
    expect(app.hasConfig).toBeFalsy();
    
    const data = {
      searchURL: "http://localhost:5000/api"
    }

    app.loadConfiguration(_ => {
      expect(app.hasConfig).toBeTruthy();
      done()
    });

    const req = httpMock.expectOne(service.configUrl);
    expect(req.request.method).toBe("GET");
    req.flush(data);
  });

});
