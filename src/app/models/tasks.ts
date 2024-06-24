import { EResponsible } from "./EResponsible";

export interface Tasks {
  id: number,
  title: string;
  responsible: EResponsible;
  dateCreate: string;
  dateEnd: string;
  finish: boolean;
}
