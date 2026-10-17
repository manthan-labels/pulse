const ipaddress = require("ipaddr.js");
const net = require("node:net");

const validateMonitorUrl = function(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error("Invalid URL");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS are allowed");
  }

  if (url.hostname === "localhost" || url.hostname.endsWith(".localhost")) {
    throw new Error("Localhost URLs are not allowed");
  }

  if (url.username || url.password) {
    throw new Error("URL credentials are not allowed");
  }

  if (url.port && !["80", "443"].includes(url.port)) {
    throw new Error("Port not allowed");
  }

  const hostname = url.hostname.replace(/^\[|\]$/g, "");

  if (net.isIP(hostname)) {
    const address = ipaddr.parse(hostname);

    if (address.range() !== "unicast") {
      throw new Error("Private or reserved IP addresses are not allowed");
    }
  }

  return url;
}

module.exports = validateMonitorUrl;
