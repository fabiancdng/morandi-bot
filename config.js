var config = {};

config.token = "";

config.mysql = {
    host: "",
    port: 3306, //default: 3306
    user: "",
    pass: ""
}

// Global admins can change settings, which change global settings like the presence.
// Put in discord IDs in the array.
config.globalAdmins = [
    ""
];

module.exports = config;
