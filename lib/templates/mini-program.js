"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const base_1 = __importDefault(require("./base"));
class TemplateMiniProgram extends base_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'mini-program';
        this.path = path_1.join(__dirname, '../../templates/mini-program');
        this.description = 'template for mini-program application by use taro';
        this.templates = [];
        this.features = [];
        this.copyFiles = [
            '.gitignore',
            '.editorconfig',
            '.prettierignore',
            'babel.config.js',
            'config/*'
        ];
        this.renderFiles = [
            'babel.config.js',
            'global.d.ts',
            'package.json',
            'project.config.json',
            'README.md',
            'tsconfig.json'
        ];
        this.renderFileTypes = 'js,jsx,ts,tsx,css,scss,sass,less,md,vue,html';
    }
    gathering(flags) {
        const _super = Object.create(null, {
            gathering: { get: () => super.gathering }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.gathering.call(this, flags);
            const { factory, project } = this.data;
            this.spinner = this.createSpinner('Creating project...').start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
        });
    }
    writing() {
        const _super = Object.create(null, {
            writing: { get: () => super.writing }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.writing.call(this);
        });
    }
}
exports.default = TemplateMiniProgram;
