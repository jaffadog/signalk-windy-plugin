// signalk-windy-plugin
// MIT License
// Copyright (c) 2025 Jeremy Waters <jaffadog@gmail.com>"

module.exports = function (app) {
    var plugin = {};
    var key;

    plugin.id = "signalk-windy-plugin";
    plugin.name = "SignalK Windy Plugin";
    plugin.description = "A SignalK plugin that plots your vessel on a windy.com weather map";

    plugin.start = function (options) {
        app.debug('Plugin started');
        key = options.key;
    };

    plugin.stop = function () {
        app.debug('Stopping the plugin');
    };

    plugin.schema = {
        type: 'object',
        description: `
            The Windy.com API restricts what web server hostname/domain can be used with any given APi key. The key bundled with this SignalK
            plugin will work with SignalK servers that are accessed on http://localhost or http://raspberrypi.local. If you are using
            some other hostname/domain with your SignalK server, then you will need to get your own Windy.com API ket from https://api.windy.com/keys
            and enable your key for your own hostname/domain. Enter your key below.
            `,
        properties: {
            key: {
                title: 'Windy.com API key',
                type: 'string',
                description: 'If left blank, the bundled key will be used (see restrictions described above)'
            },
        }
    };

    plugin.registerWithRouter = (router) => {
        // http://raspberrypi.local/plugins/signalk-windy-plugin/key
        router.get('/key', (req, res) => {
            res.send(key);
        });
    };

    return plugin;
};
