export class User{
    private id: number;
    private email: string;
    private password: string;

    constructor(id:number, email: string, password: string){
        this.id = id;
        this.email = email;
        this.password = password
    }

    public getId(): number | undefined {
        return this.id
    }

    public setId(id: number): void {
        this.id = id
    }

        public getEmail(): string  {
        return this.email
    }

    public setEmail(id: string): void {
        this.email = this.email
    }

        public getPassword(): string {
        return this.password
    }

    public setPassword(id: string): void {
        this.password = this.password
    }
}