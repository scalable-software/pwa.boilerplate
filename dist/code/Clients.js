export class Clients {
    clients;
    constructor(clients) {
        this.clients = clients;
    }
    sendMessage = (client, version) => client.postMessage({
        type: "NEW_VERSION",
        version: version,
    });
    sendMessageToAll = (clients, version) => clients.forEach((client) => this.sendMessage(client, version));
    notify = (version) => this.clients
        .claim()
        .then(() => this.clients.matchAll())
        .then((clients) => this.sendMessageToAll(clients, version));
}
