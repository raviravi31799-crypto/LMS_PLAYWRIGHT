import ExcelJS from "exceljs";

export class ExcelUtils {

    static async readExcel(filePath: string) {

        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(filePath);

        return workbook.getWorksheet(1);

    }

    static async getCellValue(filePath: string, cell: string) {

        const sheet = await this.readExcel(filePath);

        return sheet?.getCell(cell).value;

    }

}