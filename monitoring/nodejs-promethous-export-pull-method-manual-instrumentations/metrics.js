import { AggregationType, MeterProvider } from "@opentelemetry/sdk-metrics";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import {
  resourceFromAttributes,
  defaultResource,
} from "@opentelemetry/resources";

const exporter = new PrometheusExporter({ port: 9464 }, () => {
  console.log("Prometheus scrape endpoint: http://localhost:9464/metrics");
});

const customResource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: "crud-service",
  [ATTR_SERVICE_VERSION]: "1.0.0",
  "service.instance.id": 1,
  "service.namespace": "example",
});
const resource = defaultResource().merge(customResource);

const meterProvider = new MeterProvider({
  readers: [exporter],
  views: [
    {
      aggregation: {
        type: AggregationType.EXPLICIT_BUCKET_HISTOGRAM,
        options: {
          boundaries: [1, 2, 5,6,10]
        }
      },
      instrumentName: 'crud_operation_duration_seconds'
    },
    ],
  resource,
});

const meter = meterProvider.getMeter("example-prometheus");

const crudCounter = meter.createCounter("crud_operations_total", {
  description: "Total number of CRUD operations",
});
const crudHistogram = meter.createHistogram("crud_operation_duration_seconds", {
  description: "Duration of CRUD operations in seconds",
});

export { crudCounter, crudHistogram };
