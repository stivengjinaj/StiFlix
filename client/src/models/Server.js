class Server {
    constructor(serverName, serverLink, serverStatus) {
        this.serverName = serverName;
        this.serverLink = serverLink;
        this.serverStatus = serverStatus;
    }

    getServerName() {
        return this.serverName;
    }

    getServerLink() {
        return this.serverLink;
    }

    getServerStatus() {
        return this.serverStatus;
    }
}

export default Server;