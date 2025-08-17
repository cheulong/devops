import * as logsAPI from "@opentelemetry/api-logs";
import {
  LoggerProvider,
  BatchLogRecordProcessor,
  SimpleLogRecordProcessor,
  ConsoleLogRecordExporter,
} from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { resourceFromAttributes } from "@opentelemetry/resources";
import callsites from "callsites";

export const severityTextLvl = {
  TRACE: "TRACE",
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  FATAL: "FATAL",
  NOSET: "NOTSET",
};

const scope = {
  FRONT_END: "react-frontend",
  BACK_END: "node-backend",
  API_SERVICE: "api-service",
};

const getCaller = () => {
  const stack = callsites();
  const caller = stack[3];
  return {
    code_file_path: caller.getFileName(),
    code_line_number: caller.getLineNumber(),
    code_function_name: caller.getFunctionName(),
  };
};

const customLogger = ({
  serviceName = "index.js",
  instanceId = 1,
  serviceVersion = "0.0.1",
  serviceNamespace = "default",
} = {}) => {
  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: serviceName,
    [ATTR_SERVICE_VERSION]: instanceId,
    "service.instance.id": serviceVersion,
    "service.namespace": serviceNamespace,
  });

  // exporter options. see all options in OTLPExporterConfigBase
  const collectorOptions = {
    url: "http://localhost:4318/v1/logs", // Alloy OTLP HTTP endpoint
    concurrencyLimit: 1, // an optional limit on pending requests
  };

  const logExporter = new OTLPLogExporter(collectorOptions);
  const loggerProvider = new LoggerProvider({
    processors: [new BatchLogRecordProcessor(logExporter)],
    // processors: [new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())],
    resource,
  });

  // You can also use global singleton
  logsAPI.logs.setGlobalLoggerProvider(loggerProvider);
  const logger = logsAPI.logs.getLogger(scope.FRONT_END, "0.0.1");

  const sendLog = ({ level = severityTextLvl.NOTSET, msg = null }) => {
    logger.emit({
      severityNumber: logsAPI.SeverityNumber[level],
      severityText: level,
      body: msg,
      attributes: { ...getCaller() },
    });
  };

  const info = (msg) => {
    sendLog({ level: severityTextLvl.INFO, msg });
  };

  const warn = (msg) => {
    sendLog({ level: severityTextLvl.WARN, msg });
  };

  const error = (msg) => {
    sendLog({ level: severityTextLvl.ERROR, msg });
  };

  const fatal = (msg) => {
    sendLog({ level: severityTextLvl.FATAL, msg });
  };

  const trace = (msg) => {
    sendLog({ level: severityTextLvl.TRACE, msg });
  };

  const debug = (msg) => {
    sendLog({ level: severityTextLvl.DEBUG, msg });
  };

  const notset = (msg) => {
    sendLog({ level: severityTextLvl.NOTSET, msg });
  };

  return {
    info,
    warn,
    error,
    fatal,
    trace,
    debug,
    notset,
  };
};

export default customLogger;
