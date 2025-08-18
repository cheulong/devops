# Node.js Prometheus Export Pull Method Manual Instrumentations

This is a sample project that shows how to manually instrument a Node.js application using the Prometheus Export Pull Method.

# Run
```bash
npm install
node index.js
```

# Test

## API


### POST Add Item
```bash
POST http://localhost:3000/items
```

Body
```json
{
    "name": "Apple"
}
```

### Get all items
```bash
GET http://localhost:3000/items
```

### Update an item
```bash
PUT http://localhost:3000/items/1
```

Body
```json
{
    "name": "New Name"
}
```

### DELETE a Item
```bash
DELETE http://localhost:3000/items/1
```


### GET Prometheus Metrics
```bash
GET http://localhost:9464/metrics
```
