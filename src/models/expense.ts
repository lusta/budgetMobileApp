export class Expense {
    _id : string;
    name : string = "";
    description : string = "";
    amount : string = "";
    user : string = "";
    create_at : string = "";
    updated_at : string = "";

    constructor(_id : string, name : string, description : string,
        amount : string, user : string, create_at : string, updated_at : string) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.user = user;
        this.create_at = create_at;
        this.updated_at = updated_at;
    }
}