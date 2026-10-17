
const dns = require("node:dns/promises");
const ipaddr = require("ipaddr.js");
const net = require("node:net");

const validateMonitorDns = async function validateMonitorDns(url) {
  const hostname = url.hostname.replace(/^\[|\]$/g, "");

  if (net.isIP(hostname)) {
    const address = ipaddr.parse(hostname);

    if (address.range() !== "unicast") {
      throw new Error("Private or reserved IP addresses are not allowed");
    }

  }

  let addresses;

  try {
    addresses = await dns.lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error("Hostname could not be resolved");
  }

  if (addresses.length === 0) {
    throw new Error("Hostname has no IP addresses");
  }

  for (const entry of addresses) {
    const address = ipaddr.parse(entry.address);

    if (address.range() !== "unicast") {
      throw new Error("Hostname resolves to a private or reserved IP address");
    }
  }
}

module.exports = validateMonitorDns;
