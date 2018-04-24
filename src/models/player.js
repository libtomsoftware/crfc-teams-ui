export default class PlayerModel {
    constructor(data) {
        this.id = data._id; //eslint-disable-line
        this.firstname = data.firstname;
        this.lastname = data.lastname;
    }
}
