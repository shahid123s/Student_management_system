export class Student {
    constructor(
        public id: string | null,
        public name: string,
        public dob: Date,
        public marks: number,
        public email: string,
        public className: string,
        public rollNo: number,
        public password: string,
        public role : string = 'student'
    ){}
}

