import { async, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let injector: TestBed;
  let service: ConfigService;
  let httpMock: HttpTestingController;

   beforeEach(async(() => {
    TestBed.configureTestingModule({
    
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
    .compileComponents();

    injector = getTestBed();
    service = injector.get(ConfigService);
    httpMock = injector.get(HttpTestingController);

  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
     expect(service).toBeTruthy();
  });

  it("should load configuration", () => {

    const data = {
      searchURL: "http://localhost:5000/api"
    }
    service.getConfig$().subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(service.configUrl);
    expect(req.request.method).toBe("GET");
    req.flush(data);
  });
});
