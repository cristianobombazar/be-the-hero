import app from './app';

class Server {

  constructor() {
    this.initializePort();
  }

  private initializePort() {
    app.listen(3333, () => {
        console.log("Server started on port 3333")
    });
}

}

export default new Server();