import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

export class ExcelUtils {

    private static resolvePath(fileNameOrPath: string): string {
        if (path.isAbsolute(fileNameOrPath)) {
            return fileNameOrPath;
        }
        return path.resolve(__dirname, "../../../testdata", fileNameOrPath);
    }

    static async readExcel(filePath: string) {
        const fullPath = this.resolvePath(filePath);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(fullPath);
        return workbook.getWorksheet(1);
    }

    static async getCellValue(filePath: string, cell: string) {
        const sheet = await this.readExcel(filePath);
        return sheet?.getCell(cell).value;
    }

    static async readExcelToJSON<T = any>(fileNameOrPath: string, sheetIndexOrName: number | string = 1): Promise<T[]> {
        const fullPath = this.resolvePath(fileNameOrPath);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(fullPath);

        const sheet = typeof sheetIndexOrName === "number"
            ? workbook.getWorksheet(sheetIndexOrName)
            : workbook.getWorksheet(sheetIndexOrName);

        if (!sheet) {
            return [];
        }

        const rows: T[] = [];
        const headers: { [col: number]: string } = {};

        sheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) {
                row.eachCell((cell, colNumber) => {
                    const val = cell.value;
                    headers[colNumber] = String(val !== null && val !== undefined ? val : "").trim();
                });
            } else {
                const rowObj: any = {};
                row.eachCell((cell, colNumber) => {
                    const header = headers[colNumber];
                    if (header) {
                        let cellVal = cell.value;
                        if (cellVal !== null && typeof cellVal === "object") {
                            if ("text" in cellVal) {
                                cellVal = (cellVal as any).text;
                            } else if ("result" in cellVal) {
                                cellVal = (cellVal as any).result;
                            }
                        }
                        rowObj[header] = String(cellVal !== null && cellVal !== undefined ? cellVal : "").trim();
                    }
                });
                if (Object.keys(rowObj).length > 0) {
                    rows.push(rowObj as T);
                }
            }
        });

        return rows;
    }

    static async writeExcelFromJSON(fileNameOrPath: string, sheetName: string, headers: string[], rows: any[]): Promise<string> {
        const fullPath = this.resolvePath(fileNameOrPath);
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(sheetName);

        sheet.columns = headers.map(header => ({
            header: header,
            key: header,
            width: 25
        }));

        for (const row of rows) {
            sheet.addRow(row);
        }

        await workbook.xlsx.writeFile(fullPath);
        return fullPath;
    }
}