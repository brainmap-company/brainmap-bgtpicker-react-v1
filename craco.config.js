const CompressionPlugin = require('compression-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    reactScriptsVersion: 'react-scripts',
    style: {
        sass: {
            loaderOptions: {
                sassOptions: {
                    includePaths: ['node_modules', 'src/assets'],
                },
            },
        },
        postcss: {
            plugins: [require('postcss-rtl')()],
        },
    },
    webpack: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@svg': path.resolve(__dirname, 'src/assets/svg'),
            '@json': path.resolve(__dirname, 'src/assets/json'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@lib': path.resolve(__dirname, 'src/lib'),
            '@hlibs': path.resolve(__dirname, 'src/lib/hlibs'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@modals': path.resolve(__dirname, 'src/modals'),
            '@template': path.resolve(__dirname, 'src/template'),
        },
        configure: (webpackConfig) => {
            // 브라우저 호환성 설정
            webpackConfig.resolve.fallback = {
                process: require.resolve('process/browser.js'),
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                path: require.resolve('path-browserify'),
                zlib: require.resolve('browserify-zlib'),
                vm: require.resolve('vm-browserify'),
                assert: require.resolve('assert/'),
                buffer: require.resolve('buffer/'),
                util: require.resolve('util/'),
                net: false,
                tls: false,
                fs: false,
            };

            // Buffer 폴리필 추가
            webpackConfig.plugins.push(
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                }),
            );

            // process 폴리필 추가
            webpackConfig.plugins.push(
                new webpack.DefinePlugin({
                    'process.env': JSON.stringify(process.env),
                }),
            );

            // 빌드 최적화 설정
            webpackConfig.optimization = {
                ...webpackConfig.optimization,
                minimize: true,
                minimizer: [
                    new EsbuildPlugin({
                        target: 'es2024',
                        css: true,
                        minify: true,
                        minifyWhitespace: true,
                        minifyIdentifiers: true,
                        minifySyntax: true,
                        drop: ['console', 'debugger'],
                    }),
                ],
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 0,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                if (module.context && module.context.includes('node_modules')) {
                                    let packageName = module.context.split('node_modules/')[1]?.split('/')[0];
                                    if (packageName && packageName.includes('@')) packageName = packageName.split('@')?.[1];
                                    return packageName;
                                }
                                return null;
                            },
                        },
                        common: {
                            name: 'common',
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                    },
                },
                runtimeChunk: 'single',
            };

            // 출력 파일 최적화
            webpackConfig.output = {
                ...webpackConfig.output,
                filename: 'static/js/[name].[contenthash:8].js',
                chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
                assetModuleFilename: 'static/media/[name].[hash:8][ext]',
                publicPath: '/',
            };

            // 성능 최적화
            webpackConfig.performance = {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000,
            };

            // 압축 플러그인 추가
            webpackConfig.plugins.push(
                new CompressionPlugin({
                    algorithm: 'gzip',
                    test: /\.(js|css|html|svg)$/,
                    threshold: 10240,
                    minRatio: 0.8,
                }),
            );

            // 모듈 최적화
            webpackConfig.module = {
                ...webpackConfig.module,
                rules: [
                    ...webpackConfig.module.rules,
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: path.resolve(__dirname, 'src'),
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                            presets: [
                                [
                                    require.resolve('babel-preset-react-app'),
                                    {
                                        runtime: 'automatic',
                                    },
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: true,
                        },
                    },
                    {
                        test: /\.m?js$/,
                        resolve: {
                            fullySpecified: false,
                        },
                    },
                ],
            };

            // 개발 모드 설정
            if (process.env.REACT_APP_CUSTOM_MODE == 'DEV' || process.env.REACT_APP_CUSTOM_MODE === 'PRE-RELEASE') {
                webpackConfig.devtool = 'eval-source-map';
                webpackConfig.optimization = {
                    ...webpackConfig.optimization,
                    minimize: false,
                };
            }

            // 캐시 최적화 추가
            webpackConfig.cache = {
                type: 'filesystem',
                buildDependencies: {
                    config: [__filename]
                },
                cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack'),
            };
            
            // 병렬 처리 최적화
            webpackConfig.parallelism = 100;
            
            // resolve 최적화
            webpackConfig.resolve = {
                ...webpackConfig.resolve,
                modules: ['node_modules', path.resolve(__dirname, 'src')],
                extensions: ['.js', '.jsx', '.json'],
                symlinks: false,
            };
            
            // 불필요한 소스맵 제거 (프로덕션에서)
            if (process.env.NODE_ENV === 'production') {
                webpackConfig.devtool = false;
            }

            return webpackConfig;
        },
    },
    babel: {
        loaderOptions: (babelLoaderOptions) => {
            const plugins = babelLoaderOptions.plugins || [];
            const hasNullishPlugin = plugins.some((plugin) => (Array.isArray(plugin) && plugin[0] === '@babel/plugin-proposal-nullish-coalescing-operator') || plugin === '@babel/plugin-proposal-nullish-coalescing-operator');

            if (!hasNullishPlugin) {
                plugins.push('@babel/plugin-proposal-nullish-coalescing-operator');
            }

            return {
                ...babelLoaderOptions,
                plugins,
            };
        },
    },
};
