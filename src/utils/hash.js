const crypto = require('crypto');

function hashString(str) {
  const hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
}

module.exports = {
  hashString,
};
