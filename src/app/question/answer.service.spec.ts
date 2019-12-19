import { async, TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { AnswerService } from './answer.service';
import { environment } from "../../environments/environment";

describe('AnswerService', () => {
  
  let injector: TestBed;
  let service: AnswerService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    injector = getTestBed();
    service = injector.get(AnswerService);
    service.API_URL = environment['answerURL'];
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  

  it('should be created', () => {
     expect(service).toBeTruthy();
  });


  xit("should post the answer questions", () => {
    const answer = {
    };

    service.postAnswer$(answer).subscribe(res => {
      expect(res).toBeTruthy()
    });

    service.API_URL = environment['answerURL'];
    const req = httpMock.expectOne(service.API_URL);
    expect(req.request.method).toBe("POST");
    req.flush({
      payload: []
    });
  });

  xit("should catch error when post the answer questions", () => {

    const answer = {
    };
    
    service._postAnswer$(answer).subscribe(res => {
    }, err => {
      console.log('returned and error as expected')
      expect(err).toBeTruthy()
    });
    
    service.API_URL = environment['answerURL'];
    const req = httpMock.expectOne(service.API_URL);
    expect(req.request.method).toBe("POST");
    req.flush({});
  });

});
