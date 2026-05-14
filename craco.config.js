const TerserPlugin = require('terser-webpack-plugin');
const { whenProd } = require('@craco/craco');
const webpack = require('webpack');

const isEnabled = (value) => ['1', 'true', 'yes'].includes(String(value).toLowerCase());

class ProcessAssetsTracePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('ProcessAssetsTracePlugin', () => {
      console.log('[webpack-hook] emit');
    });
    compiler.hooks.afterCompile.tap('ProcessAssetsTracePlugin', () => {
      console.log('[webpack-hook] afterCompile');
    });
    compiler.hooks.shouldEmit.tap('ProcessAssetsTracePlugin', () => {
      console.log('[webpack-hook] shouldEmit');
      return true;
    });
    compiler.hooks.afterEmit.tap('ProcessAssetsTracePlugin', () => {
      console.log('[webpack-hook] afterEmit');
    });
    compiler.hooks.done.tap('ProcessAssetsTracePlugin', () => {
      console.log('[webpack-hook] done');
    });
    compiler.hooks.compilation.tap('ProcessAssetsTracePlugin', (compilation) => {
      compilation.hooks.afterSeal.intercept({
        register: (tap) => {
          const original = tap.fn;

          tap.fn = (...args) => {
            const label = `[afterSeal] ${tap.name}`;
            const start = Date.now();
            console.log(`${label} start`);

            const done = () => {
              console.log(`${label} done ${Date.now() - start}ms`);
            };

            try {
              const result = original(...args);

              if (result && typeof result.then === 'function') {
                return result.finally(done);
              }

              done();
              return result;
            } catch (error) {
              console.log(`${label} failed ${Date.now() - start}ms`);
              throw error;
            }
          };

          return tap;
        },
      });
      compilation.hooks.afterSeal.tap('ProcessAssetsTracePlugin', () => {
        console.log('[webpack-hook] afterSeal');
      });
      compilation.hooks.afterProcessAssets.tap('ProcessAssetsTracePlugin', () => {
        console.log('[webpack-hook] afterProcessAssets');
      });
      compilation.hooks.processAssets.intercept({
        register: (tap) => {
          const original = tap.fn;

          tap.fn = (...args) => {
            const label = `[processAssets] ${tap.name} stage=${tap.stage ?? 'default'}`;
            const start = Date.now();
            console.log(`${label} start`);

            const done = () => {
              console.log(`${label} done ${Date.now() - start}ms`);
            };

            try {
              const result = original(...args);

              if (result && typeof result.then === 'function') {
                return result.finally(done);
              }

              done();
              return result;
            } catch (error) {
              console.log(`${label} failed ${Date.now() - start}ms`);
              throw error;
            }
          };

          return tap;
        },
      });
    });
  }
}

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.parallelism = 4;

      if (isEnabled(process.env.BUILD_PROGRESS)) {
        webpackConfig.plugins.push(
          new webpack.ProgressPlugin((percentage, message, ...details) => {
            const percent = Math.round(percentage * 100);
            console.log(`[webpack] ${percent}% ${message} ${details.join(' ')}`.trim());
          })
        );
      }

      if (isEnabled(process.env.TRACE_ASSETS)) {
        webpackConfig.plugins.push(new ProcessAssetsTracePlugin());
      }

      if (process.env.NODE_ENV === 'production') {
        webpackConfig.cache = false;
      } else {
        webpackConfig.cache = {
          type: 'filesystem',
          buildDependencies: {
            config: [__filename],
          },
        };
      }

      whenProd(() => {
        if (isEnabled(process.env.DISABLE_MINIFY)) {
          webpackConfig.optimization = {
            ...webpackConfig.optimization,
            minimize: false,
          };

          return;
        }

        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ],
        };
      });

      return webpackConfig;
    },
  },
  devServer: {
    hot: true,
    liveReload: false,
    proxy: {
      '/api': {
        target: 'https://philosophical-ariel-novarwa-4fd2a870.koyeb.app',
        changeOrigin: true,
        secure: true,
        ws: true,        // ← add this for WebSocket support (chat/notifications)
        // No pathRewrite — /api prefix is kept, matching your backend routes
      },
    },
  },
};
