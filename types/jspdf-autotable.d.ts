declare module "jspdf-autotable" {
  import { jsPDF } from "jspdf";

  export interface UserOptions {
    startY?: number;
    head?: any[][];
    body?: any[][];
    foot?: any[][];
    theme?: "striped" | "grid" | "plain";
    headStyles?: any;
    bodyStyles?: any;
    footStyles?: any;
    margin?:
      | { left?: number; right?: number; top?: number; bottom?: number }
      | number;
    [key: string]: any;
  }

  export default function autoTable(doc: jsPDF, options: UserOptions): void;
}
