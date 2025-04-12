[![npm version](https://img.shields.io/npm/v/signalk-windy-plugin.svg)](https://www.npmjs.com/package/signalk-windy-plugin)

# SignalK Windy Plugin

A [SignalK](https://signalk.org/) plugin that plots your vessel on a [windy.com](https://www.windy.com/) weather map.

## What Does It Do?

This plugin/webapp will plot your vessel's current position on a Windy.com weather map. If you are using the tracks plugin, it will also plot your recent track up to your present position.

This plugin uses the Windy.com API which requires a license key. A license key has been bundled with this plugin. However, it comes with the following restriction: 

**The bundled Windy.com license key will only work with SignalK servers hosted at http://localhost or http://raspberrypi.local.**

This is a restriction imposed by Windy.com - which require you to register all the authorized domains on your license key. If you host your SignalK server at a differnt hostname/domain, you will have to:

- Obtain your own **Windi.com API** key at https://api.windy.com/keys
- Configure your **Windy.com API** key to permit your hostname/domain
- Enter your key on the **SignalK Windy Plugin** configuration screen
