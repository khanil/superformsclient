export function getFromMarkup(elementId, scheme) {
  return new Promise((resolve, reject) => {
    const container = document.getElementById(elementId);

    if (container == null) {
      return reject(new ConfigError(`Config not found`));
    }

    const dataJSON = container.innerHTML;
    if (dataJSON == null) {
      return reject(new ConfigError('Config is empty'));
    }

    let data;
    try {
      data = JSON.parse(dataJSON);
    } catch(err) {
      return reject(new ConfigError(err.message));
    }

    const config = {};
    scheme.forEach((key) => {
      if (data[key] == undefined) {
        return reject(new ConfigError(`Can't find '${key}' field`));
      }

      config[key] = data[key];
    });

    resolve(config);
  });
}

function ConfigError(message) {
  this.name = "ConfigError";
  this.message = message;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

}

ConfigError.prototype = Object.create(Error.prototype);
ConfigError.prototype.constructor = ConfigError;

export default function getFromConfig(scheme) {
  return getFromMarkup('config', scheme);
}