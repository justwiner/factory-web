import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
export declare type TemplateTypes = 'micro-main' | 'micro-react' | 'micro-vue' | 'react' | 'vue';
export interface IConfigOption {
    title: string;
    port?: number;
    mode?: string;
    factory: {
        id: string;
        version: string;
        template: string;
        features: Record<string, any>;
    };
}
export interface WebpackConfiguration extends Configuration {
    devServer: DevServerConfiguration;
}
export interface IFactoryPaths {
    cwd: string;
    src: string;
    dist: string;
    public: string;
    js: string;
    css: string;
    cssExtractPublicPath: string;
    img: string;
    assets: string;
}
interface IFactoryFeatures {
    typescript: string;
}
export interface IFactoryConfig {
    id: string;
    version: string;
    template: TemplateTypes;
    features: IFactoryFeatures;
}
export interface IFbiConfig {
    factory: IFactoryConfig;
    paths: IFactoryPaths;
}
export interface IFbiFlagsConfig {
}
export {};
