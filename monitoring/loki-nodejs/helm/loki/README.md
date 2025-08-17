### Install Loki
```
helm repo add grafana https://grafana.github.io/helm-charts

helm repo update

helm install loki grafana/loki -f values.yaml --namespace loki --create-namespace
```

### Upgrade Loki
```
helm upgrade loki grafana/loki -f values.yaml --namespace loki
```

### Add Loki data source in Grafana
```bash
# URL
http://loki-gateway.loki.svc.cluster.local:80
# http://<service-name>.<namespace>.svc.cluster.local:80
```

# Test 

```bash
kubectl port-forward --namespace loki svc/loki-gateway 3100:80
```

```bash
 curl -H "Content-Type: application/json" -XPOST -s "http://127.0.0.1:3100/loki/api/v1/push"  --data-raw "{\"streams\": [{\"stream\": {\"job\": \"test\"}, \"values\": [[\"$(date +%s)000000000\", \"fizzbuzz1\"]]}]}"
 ```

 # Send logs to Loki from a container

 ReactJs
Using Alloy + OpenTelemetry

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install alloy grafana/alloy -n alloy --create-namespace
```

 install OpenTelemetry Js in ReactJs
 ```bash
 npm install @opentelemetry/api-logs @opentelemetry/exporter-logs-otlp-http  @opentelemetry/sdk-logs
 @opentelemetry/semantic-conventions
 @opentelemetry/resources
 callsites
 ```