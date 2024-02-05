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
  _id: string;
  serie: string;
  name: string;
  level: number;
  volume: number;
  pressure: number;
  date_in_ms: number;
  signal: string;
  device: string;
  created_at: string;
  updated_at: string;
}