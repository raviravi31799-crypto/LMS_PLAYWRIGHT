export interface CategoryCsvRow {
    CategoryName: string;
    CourseNames: string;
    CategoryDescription: string;
    UpdatedCategoryName:string;
}

export interface AddStructureData {
    courseName: string;
    header: string;
}
export interface ServiceData {
    ServiceName: string;
    Description: string;
}
export interface pedagogyElement{
    newName: string;
}