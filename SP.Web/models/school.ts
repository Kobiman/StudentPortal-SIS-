export class School {
  public name: string;
  public get Name(): string{
    return this.name;
  }
  public set Name(v: string){
    this.name=v;
  }

  public academicYear: string;
  public get AcademicYear(): string{
    return this.academicYear;
  }
  public set AcademicYear(v: string){
    this.academicYear=v;
  }

  public semester: string;
  public get Semester(): string{
    return this.semester;
  }
  public set Semester(v: string){
    this.semester=v;
  }

  public institutionId: string;
  public get InstitutionId(): string{
    return this.institutionId;
  }
  public set InstitutionId(v: string){
    this.institutionId=v;
  }

  public institutionName: string;
  public get InstitutionName(): string{
    return this.institutionName;
  }
   public set InstitutionName(v: string){
    this.institutionName=v;
  }

  public schoolId: string;
  public get SchoolId(): string{
    return this.schoolId;
  }
   public set SchoolId(v: string){
    this.schoolId=v;
  }

  public lecturerId: string;
  public get LecturerId(): string{
    return this.lecturerId;
  }
   public set LecturerId(v: string){
    this.lecturerId=v;
  }
}
