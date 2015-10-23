/*jslint node: true */

var flatten = require('flat')
var YAML = require('yamljs');

//--

var VAR_MARK = '%';

module.exports = {

    readAssets: function (configFile) {

        function parseString(string, mark, value) {
            var marker = VAR_MARK + mark + VAR_MARK;
            return string.replace(marker, value);
        }

        function mapString(string, map) {
            for (var k in map) {
                string = parseString(string, k, map[k]);
            }
            return string;
        }

        function parseAssets(filemap, variables) {
            var result = {};
            var map = flatten(variables, { delimiter: '.' });
            for (var i in filemap) {
                var im = mapString(i, map);
                result[im] = [];
                if (typeof filemap[i] === 'object') {
                    for (var j in filemap[i]) {
                        result[im][j] = mapString(filemap[i][j], map);
                    }
                } else if (typeof filemap[i] === 'string') {
                    result[im] = mapString(filemap[i], map);
                }
            }
            return result;
        }

        var config = YAML.load(configFile);
        var variables = config.var;
        var assets = {};

        if (typeof config.assets !== 'undefined') {
            for (var i = 0; i < config.assets.length; i++) {
                assets[config.assets[i]] = parseAssets(
                    config[config.assets[i]],
                    variables
                );
            }
        }

        return {
            var: variables,
            assets: assets
        };
    }
};
