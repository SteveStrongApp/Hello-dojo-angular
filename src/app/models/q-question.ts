
import { qAtom } from "./q-atom";


export class qQuestion extends qAtom  {

  Id:number;
  question:string;
  answer:boolean;
  
  constructor(properties?: any) {
    super(properties)
  }

}
