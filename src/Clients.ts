export class Clients {
  public clients;
  constructor(clients) {
    this.clients = clients;
  }

  private sendMessage = (client, version) =>
    client.postMessage({
      type: "NEW_VERSION",
      version: version,
    });

  private sendMessageToAll = (clients, version) =>
    clients.forEach((client) => this.sendMessage(client, version));

  public notify = (version) =>
    this.clients
      .claim()
      .then(() => this.clients.matchAll())
      .then((clients) => this.sendMessageToAll(clients, version));
}
