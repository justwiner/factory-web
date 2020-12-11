"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetJsonPlugin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
// output assets list in HtmlWebpackPlugin
class AssetJsonPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        let result;
        compiler.hooks.compilation.tap('AssetJsonPlugin', (compilation) => {
            html_webpack_plugin_1.default.getHooks(compilation).afterEmit.tapAsync('AssetJsonPlugin', async (data, cb) => {
                // get entries
                let entryNames = [];
                switch (typeof compiler.options.entry) {
                    case 'string':
                        entryNames.push(path_1.basename(compiler.options.entry).replace(path_1.extname(compiler.options.entry), ''));
                        break;
                    case 'object':
                        entryNames = Object.keys(compiler.options.entry);
                        break;
                    default:
                        break;
                }
                if (compiler.options.output) {
                    const { filename, publicPath } = compiler.options.output;
                    if (this.options.onlyEntryFile && typeof filename === 'string') {
                        const hash = data.plugin.childCompilerHash;
                        const tmp = entryNames.map((n) => `${publicPath}${filename.replace('[name]', n).replace('[hash]', hash)}`);
                        result = JSON.stringify(tmp);
                    }
                    else {
                        result = data.plugin.assetJson;
                    }
                }
                // Tell webpack to move on
                cb(null, data);
            });
        });
        compiler.hooks.done.tap('AssetJsonPlugin output', async (stats /* stats is passed as argument when done hook is tapped.  */) => {
            var _a;
            const outputDir = (_a = compiler.options.output) === null || _a === void 0 ? void 0 : _a.path;
            if (result && outputDir) {
                let microAppJson = {
                    entry: '',
                    routes: []
                };
                if (this.options.onlyEntryFile) {
                    try {
                        const microAppJs = require(path_1.join(process.cwd(), this.options.input));
                        microAppJson = Object.assign({}, microAppJs);
                    }
                    catch (err) {
                        console.log(err);
                    }
                    microAppJson.entry = JSON.parse(result)[0];
                }
                else {
                    microAppJson = JSON.parse(result);
                }
                const targetFile = path_1.join(outputDir, this.options.output);
                try {
                    await fs_1.default.writeFile(targetFile, JSON.stringify(microAppJson), () => { });
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    }
}
exports.AssetJsonPlugin = AssetJsonPlugin;