var anyBase = require('any-base');

var base58 = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';

var fromHex = anyBase(anyBase.HEX, base58);
var toHex = anyBase(base58, anyBase.HEX);

function shortenUUID (longId, translator) {
    return translator(longId.toLowerCase().replace(/-/g,''));
}

function enlargeUUID(shortId, translator) {
    var uu1 = translator(shortId);
    var leftPad = "";
    var m;

    // Pad out UUIDs beginning with zeros (any number shorter than 32 characters of hex)
    for (var i = 0, len = 32-uu1.length; i < len; ++i) {
        leftPad += "0";
    }

    // Join the zero padding and the UUID and then slice it up with match
    m = (leftPad + uu1).match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/);

    // Accumulate the matches and join them.
    return [m[1], m[2], m[3], m[4], m[5]].join('-');
}

function shorten8 (longId, translator) {
  const cleanId = longId.toLowerCase().replace(/-/g,'')
  if (/^[0-9a-f]+$/i.test(cleanId)) {
    return shortenUUID(longId, translator).substr(-8);
  }
  return longId;
}

function order(uuid) {
  return uuid.substr(14, 4) + uuid.substr(9, 4) + uuid.substr(0, 8) + uuid.substr(19, 4) + uuid.substr(24);
}

function unorder(id) {
  return id.substr(8, 8) + "-" + id.substr(4, 4) + "-" + id.substr(0, 4) + "-" + id.substr(16, 4) + "-" + id.substr(20);
}

module.exports = {
  shorten: (uuid) => shortenUUID(uuid, fromHex),
  enlarge: (shortUuid) => enlargeUUID(shortUuid, toHex),
  shorten8: (uuid) => shorten8(uuid, fromHex),
  order: (uuid) => order(uuid),
  unorder: (id) => unorder(id)
}
