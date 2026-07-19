declare module 'xlsx' {
  export interface WorkBook {
    SheetNames: string[];
    Sheets: { [sheet: string]: WorkSheet };
  }

  export interface WorkSheet {
    [cell: string]: CellObject;
  }

  export interface CellObject {
    v: any;
    w?: string;
    t?: string;
  }

  export function write(wb: WorkBook, opts?: WriteOptions): any;
  export function read(data: any, opts?: ReadOptions): WorkBook;

  export namespace utils {
    function book_new(): WorkBook;
    function book_append_sheet(wb: WorkBook, ws: WorkSheet, name: string): void;
    function json_to_sheet(data: any[], opts?: SheetOptions): WorkSheet;
    function sheet_add_json(ws: WorkSheet, data: any[], opts?: AddOptions): void;
    function sheet_to_json(ws: WorkSheet, opts?: { defval?: any }): any[];
  }
}

interface WriteOptions {
  bookType: 'xlsx' | 'xls' | 'csv';
  type: 'array' | 'string' | 'buffer';
}

interface SheetOptions {
  header?: string[];
}

interface AddOptions {
  skipHeader?: boolean;
  origin?: string | number;
}

interface ReadOptions {
  type?: string;
}