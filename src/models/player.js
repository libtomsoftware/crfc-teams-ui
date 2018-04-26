export default class PlayerModel {
    constructor(data) {
        this.id = data._id; //eslint-disable-line
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.dob = data.dob;
        this.guardianFirstname = data.guardianFirstname;
        this.guardianLastname = data.guardianLastname;
        this.email = data.email;
    }
}
