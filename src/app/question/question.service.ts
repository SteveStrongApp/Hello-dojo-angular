import { Injectable } from "@angular/core";
import { Toast, EmitterService } from "../shared";
import { HttpClient } from "@angular/common/http";

import { qQuestion } from "../models";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

interface iQuiz {
  quizTitle: string;
  questions: Array<qQuestion>;
}

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  API_URL:string = `../../assets/data/`

  title: string;
  questionList: Array<qQuestion>;
  currentQuestionId = 0;

  constructor(private http: HttpClient) {
    //EmitterService.registerCommand(this, "ImportCase", this.onImportCase);
    //EmitterService.processCommands(this);
  }

  public firstQuestion(): qQuestion {
    this.currentQuestionId = 0;
    let q = this.questionList[this.currentQuestionId];
    return q;
  }

  public nextQuestion(): qQuestion {
    this.currentQuestionId++;
    if (this.currentQuestionId >= this.questionList.length) {
      this.currentQuestionId = 0;
    }
    let q = this.questionList[this.currentQuestionId];
    return q;
  }

  private createQuizModel(questions: Array<qQuestion>): Array<qQuestion> {
    const list = new Array<qQuestion>();
    
    questions.forEach(q => {
      list.push(new qQuestion(q));
    });
    return list;
  }

  public consumeDataModel(data:any) {
    this.title = data.quizTitle;
    this.questionList = this.createQuizModel(data.questions);
    return this;
  }

  // https://medium.com/netscape/testing-with-the-angular-httpclient-api-648203820712

  public getQuestions$(): Observable<any> {
    const filename = "questions.json";
    const url = `${this.API_URL}${filename}`;

    return this.http.get<iQuiz>(url).pipe(
      map(res => {
        this.consumeDataModel(res);
        Toast.success("loaded!", filename);
        return filename;
      }),
      catchError(error => {
        const msg = JSON.stringify(error, undefined, 3);
        Toast.error(error.message, url);
        return of<any>(msg);
      })
    );
  }
}
