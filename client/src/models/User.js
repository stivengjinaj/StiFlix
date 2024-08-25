class User {
    constructor(fullName, email, verified, avatar=null) {
        this.fullName = fullName;
        this.email = email;
        this.verified = verified;
        this.avatar = avatar;
    }

    getFullName() {
        return this.fullName;
    }

    getEmail() {
        return this.email;
    }

    getVerified() {
        return this.verified;
    }
}

export default User;