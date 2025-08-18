// index.js
import express from "express";
import { crudCounter, crudHistogram } from "./metrics.js";

// --- Express CRUD Service ---
const app = express();
app.use(express.json());

let items = [];
let idCounter = 1;
const durationInSecond = (startTime) => {
  return (new Date() - startTime) / 1000;
};

// CREATE
app.post("/items", (req, res) => {
  const startTime = new Date();
  const item = { id: idCounter++, ...req.body };
  items.push(item);
  crudHistogram.record(durationInSecond(startTime), {
    operation: "create",
    status: "success",
  });
  crudCounter.add(1, { operation: "create", status: "success" }); // Increment the counter for create operation
  res.status(201).json(item);
});

// READ
app.get("/items", (req, res) => {
  const startTime = new Date();
  setTimeout(() => {
    const end = new Date() - startTime;
    crudHistogram.record(durationInSecond(startTime), {
      operation: "read",
      status: "success",
    });
  }, 1);

  crudCounter.add(1, { operation: "read", status: "success" }); // Increment the counter for read operation
  res.json(items);
});

// UPDATE
app.put("/items/:id", (req, res) => {
  const startTime = new Date();
  const id = Number(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    crudHistogram.record(durationInSecond(startTime), {
      operation: "update",
      status: "failure",
    });
    crudCounter.add(1, { operation: "update", status: "failure" });
    return res.status(404).send("Not found");
  }
  items[index] = { ...items[index], ...req.body };
  crudHistogram.record(durationInSecond(startTime), {
    operation: "update",
    status: "success",
  });
  crudCounter.add(1, { operation: "update", status: "success" });
  res.json(items[index]);
});

// DELETE
app.delete("/items/:id", (req, res) => {
  const startTime = new Date();
  const id = Number(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    crudHistogram.record(durationInSecond(startTime), {
      operation: "delete",
      status: "failure",
    });
    crudCounter.add(1, { operation: "delete", status: "failure" });
    return res.status(404).send("Not found");
  }
  const deleted = items.splice(index, 1);
  crudHistogram.record(durationInSecond(startTime), {
    operation: "delete",
    status: "success",
  });
  crudCounter.add(1, { operation: "delete", status: "success" });
  res.json(deleted[0]);
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`CRUD service running at http://localhost:${port}`);
});
