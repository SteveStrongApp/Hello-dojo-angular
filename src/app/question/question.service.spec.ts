import { async, TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { QuestionService } from "./question.service";
import { qQuestion } from "../models";

describe("QuestionService", () => {
  const sampleData = {
    quizTitle: "title test me",
    questions: [
      {
        Id: 1,
        question: "Earth spins around its axis once a year.",
        answer: false
      },
      {
        Id: 2,
        question: "Albert Einstein was not awarded the Nobel Prize in Physics.",
        answer: false
      }
    ]
  };

  let injector: TestBed;
  let service: QuestionService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(QuestionService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get first question", () => {

    service.consumeDataModel(sampleData);
    let result = new qQuestion(sampleData.questions[0]);
    let answer = service.firstQuestion();

    expect(answer.myType).toEqual(result.myType);
    expect(answer.Id).toEqual(result.Id);
    expect(answer.question).toEqual(result.question);
    expect(answer.answer).toEqual(result.answer);
  });

  it("should get next question", () => {

    service.consumeDataModel(sampleData);
    let result = new qQuestion(sampleData.questions[1]);
    let answer = service.firstQuestion();
    answer = service.nextQuestion();

    expect(answer.myType).toEqual(result.myType);
    expect(answer.Id).toEqual(result.Id);
    expect(answer.question).toEqual(result.question);
    expect(answer.answer).toEqual(result.answer);
  });

  it("should get to end of questions", () => {

    service.consumeDataModel(sampleData);
    let answer = service.firstQuestion();
    answer = service.nextQuestion();
    answer = service.nextQuestion();

    //loop around again
    let result = new qQuestion(sampleData.questions[0]);
    //expect(answer.myType).toEqual(result.myType);
    expect(answer.Id).toEqual(result.Id);
    expect(answer.question).toEqual(result.question);
    expect(answer.answer).toEqual(result.answer);
  });

  //https://medium.com/netscape/testing-with-the-angular-httpclient-api-648203820712

  it("should load questions", () => {

    const filename = "questions.json";
    service.getQuestions$().subscribe(res => {
      expect(res).toBe(filename);
      //console.log(service);

      expect(service.title).toEqual(sampleData.quizTitle)
      expect(service.questionList.length).toBe(2);
    });

    const req = httpMock.expectOne(`${service.API_URL}${filename}`);
    expect(req.request.method).toBe("GET");
    req.flush(sampleData);
  });

  it("should catch error when loading questions", () => {

    const filename = "questions.json";
    service.getQuestions$().subscribe(res => {
      //expect(res).toBe(filename);
    }, err => {
      console.log('returned and error as expected')
      expect(err).toBe(filename);
    });

    const req = httpMock.expectOne(`${service.API_URL}${filename}`);
    expect(req.request.method).toBe("GET");
    req.flush({});
  
  });
});
