export interface IWork {
    id?: number;
    work?: string;
    active?: boolean;
  }
  
  export class Work implements IWork {
    constructor(public id?: number, public work?: string, public active?: boolean) {}
  }
  