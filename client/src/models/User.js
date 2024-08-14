class User {
    constructor(fullName, email, verified) {
        this.fullName = fullName;
        this.email = email;
        this.verified = verified;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getVerified() {
        return this.verified;
    }
}

export default User;