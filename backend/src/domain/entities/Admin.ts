export class Admin {
    constructor(
        public id: string |null,
        public name: string,
        public email: string,
        public password: string,
        public role: string = 'admin',
        public accessToken: string|null = null,
        public refreshToken: string|null = null,
    ){}
}