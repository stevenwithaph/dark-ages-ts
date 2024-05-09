import { Client } from './client';

class ClientManager {
  private clients: Client[] = [];

  public get main() {
    return this.clients[0];
  }

  constructor() {
    this.clients.push(new Client());
  }
}

const clientManager = new ClientManager();

export { clientManager };
