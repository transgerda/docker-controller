import express from "express";
import Docker from "dockerode";
import env from 'dotenv';
env.config();

import startCronSchedule from './cron.js';
startCronSchedule();

const app = express();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

app.use(express.json());

app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey != process.env.API_KEY) return res.status(403).json({ error: 'Forbidden' });
  next();
});

function validateContainer(nameOrId, res) {
  if (!nameOrId)
    return res.status(400).json({ error: "nameOrId is required" });

  if (!allowedContainers.includes(nameOrId))
    return res.status(403).json({ error: `Container '${nameOrId}' is not allowed.` });

  return true;
}

const allowedContainers = (process.env.ALLOWED_CONTAINERS || "")
  .split(",")
  .map(c => c.trim())
  .filter(Boolean);

app.post("/start", async (req, res) => {
  const { nameOrId } = req.body;
  if (validateContainer(nameOrId, res) !== true) return;

  try {
    const container = docker.getContainer(nameOrId);
    await container.start();
    console.log(`${nameOrId} started`);
    res.json({ succes: true });
  } catch (err) {
    console.error('Error starting container: ', err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/stop", async (req, res) => {
  const { nameOrId } = req.body;
  if (validateContainer(nameOrId, res) !== true) return;

  try {
    const container = docker.getContainer(nameOrId);
    await container.stop();
    console.log(`${nameOrId} stopped`);
    res.json({ succes: true });
  } catch (err) {
    console.error('Error stopping container: ', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3333, () => console.log("Controller API running on port 3333"));
