/*
 * signalk-windy-plugin
 */

module.exports = function(app) {
    var plugin = {};
    var unsubscribes = [];

    plugin.id = "signalk-windy-plugin";
    plugin.name = "SignalK Windy Plugin";
    plugin.description = "A SignalK plugin that plots your vessel on a windy.com weather map";

    plugin.start = function(options) {
        app.debug('Plugin started');

        //foobar = options.foobar;

        var localSubscription = {
            context: 'vessels.self',
            subscribe: [{
                path: 'navigation.position',
                period: trackInterval * 60 * 1000
            }]
        };

        app.subscriptionmanager.subscribe(
            localSubscription,
            unsubscribes,
            subscriptionError => {
                app.error('Error:' + subscriptionError);
            },
            delta => { app.debug(delta); }
        );
    };

    plugin.stop = function() {
        app.debug('Stopping the plugin');
        unsubscribes.forEach(f => f());
        unsubscribes = [];
    };

    plugin.schema = {
        type: 'object',
        description: 'Hello.',
        required: ['xxx'],
        properties: {
            foobar: {
                title: 'Foo Bar',
                type: 'string',
                description: 'It\'s really foobar'
            },
        }
    };

    plugin.registerWithRouter = (router) => {
        // http://raspberrypi.local/plugins/signalk-windy-plugin/hello
        router.get('/hello', (req, res) => {
            res.send('hi');
        });
    };
    
    return plugin;
};
