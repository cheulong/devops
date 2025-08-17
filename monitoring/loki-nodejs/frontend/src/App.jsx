import { useState } from "react";
import "./App.css";
import { severityTextLvl } from "../logger";
import customLogger from "../logger";
const logger=customLogger({ serviceName: 'react-app' })

function App() {
  const [msg, setMsg] = useState("NULL");
  const [lvl, setLvl] = useState("NULL");
  const handleClick = (lvl, msg) => {
    if (lvl  === severityTextLvl.TRACE) logger.trace(msg);
    if (lvl  === severityTextLvl.DEBUG) logger.debug(msg);
    if (lvl  === severityTextLvl.INFO) logger.info(msg);
    if (lvl  === severityTextLvl.WARN) logger.warn(msg);
    if (lvl  === severityTextLvl.ERROR) logger.error(msg);
    if (lvl  === severityTextLvl.FATAL) logger.fatal(msg);
    if (lvl  === severityTextLvl.NOSET) logger.notset(msg);
    setMsg(msg);
    setLvl(lvl);
  };

  return (
    <>
      <div>
        <h1>{lvl}</h1>
        <h2>{msg}</h2>
      </div>
      <div className="card">
        <button onClick={() => handleClick(severityTextLvl.TRACE, 'This is a trace message. 🔍')}>
          {severityTextLvl.TRACE}
        </button>
        <button onClick={() => handleClick(severityTextLvl.DEBUG, 'This is a debug message. 🐛')}>
          {severityTextLvl.DEBUG}
        </button>
        <button onClick={() => handleClick(severityTextLvl.INFO, 'This is an info message. ℹ')}>
          {severityTextLvl.INFO}
        </button>
        <button onClick={() => handleClick(severityTextLvl.WARN, 'This is a warn message. ⚠')}>
          {severityTextLvl.WARN}
        </button>
        <button onClick={() => handleClick(severityTextLvl.ERROR, 'This is an error message. ❗')}>
          {severityTextLvl.ERROR}
        </button>
        <button onClick={() => handleClick(severityTextLvl.FATAL, 'This is a fatal message. 💀')}>
          {severityTextLvl.FATAL}
        </button>
        <button onClick={() => handleClick(severityTextLvl.NOSET, 'This is a notset message. ❓')}>
          {severityTextLvl.NOSET}
        </button>
      </div>
    </>
  );
}

export default App;
