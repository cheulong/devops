# Install Alloy

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install alloy grafana/alloy -n alloy --create-namespace
```

# Configure Alloy
Create a file called `config.alloy` in the same directory as the `alloy` config file.

```txt
# config.alloy
logging {
  level = "info"
  format = "logfmt"
}
```
# Create Configmap
```bash
kubectl create configmap --namespace alloy alloy-config "--from-file=config.alloy=./config.alloy" -o yaml --dry-run=client | kubectl apply -f -
```

```yaml
# values.yaml
alloy:
  configMap:
    create: false
    name: alloy-config
    key: config.alloy
```
```bash
# Check configmap
kubectl get configmap alloy-config -n alloy -o yaml
```
# Updade Alloy Config
```bash
# Update configmap
kubectl create configmap --namespace alloy alloy-config "--from-file=config.alloy=./config.alloy" -o yaml --dry-run=client | kubectl apply -f -
```
```bash
# Upgrade Alloy
helm upgrade --namespace alloy alloy grafana/alloy -f values.yaml
```
```bash
# Reload Alloy
curl -X POST http://localhost:12345/-/reload
```
# Delete Alloy
```bash
# Uninstall Alloy
helm delete --namespace alloy alloy
```

# Alloy UI

```bash
kubectl port-forward --namespace alloy service/alloy 12345:12345
```

# Send Logs from Reactjs To alloy
```bash
"@opentelemetry/api-logs": "^0.203.0",
"@opentelemetry/exporter-logs-otlp-http": "^0.203.0",
"@opentelemetry/resources": "^2.0.1",
"@opentelemetry/sdk-logs": "^0.203.0",
"@opentelemetry/semantic-conventions": "^1.36.0",
"callsites": "^4.2.0",
```


check `logger.js`
