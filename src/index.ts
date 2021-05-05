import * as express from 'express';
import { helloWorld } from './helloWorld';
import * as fs from 'fs';
import * as https from 'https';

const port = 8443;
const certDir = '/etc/knowis/security/servicecert';

// Create a new express app instance
const app: express.Application = express();

app.get(`/CPORTFE`, function (req, res) {
  const helloString = helloWorld.getWelcomeString();
  res.send(helloString);
});

// this checks for the directory of the internal tls files
if (fs.existsSync(certDir)) {
  console.log(`Starting server in HTTPS mode`);
  try {
    console.log(`Looking for TLS certificates in ${certDir}`);
    const tlsCert = fs.readFileSync(`${certDir}/tls.crt`);
    const tlsKey = fs.readFileSync(`${certDir}/tls.key`);
    const server = https.createServer({
      cert: tlsCert,
      key: tlsKey,
    }, app);
    server.listen(port, () => {
      console.log(`App listening at https://localhost:${port}`)
    });
  } catch (e) {
    console.error(`Could not read TLS certificates from ${certDir}`);
    console.error(e);
    process.exit(1); // kubernetes health check will fail here so we are also allow to fail here
  }
} else {
  console.warn(`Starting server in HTTP mode. This should only be done for local development!`);
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  });

}
