import { ObjectId } from "mongoose"

export interface passport {
  level: number
  number: number
}

export interface baseDataFace {
  device: string
}
export interface sendedDataFace {
  code: string
  data: {
    level: number
    meneral: number
    temperatyra: number
    vaqt: string
  }
}

interface DataItem {
  _id: ObjectId;
  serie: string;
  name: string;
  level: number;
  volume: number;
  pressure: number;
  date_in_ms: number;
  signal: string;
  device: {
    name: string; 
    serie: string;
  };
}
