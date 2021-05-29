import * as http from 'http';
import { App } from './app';

const express: App = new App();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

express.app.set('port', port);
express.app.set('env', env);

// create a server and pass our Express app to it.
const server = http.createServer(express.app);
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);

// function to note that Express is listening
function onListening(): void {
  console.info(`Listening on port ${port} in ${express.app.get('env')} mode`);
}

/**
 * Event listener for HTTP server 'error' event.
 */
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// application specific logging, throwing an error, or other logic here
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection: reason:', err.message);
  console.error(err.stack);
  process.exit(0);
});
