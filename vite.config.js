// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    hoistStatic: false, // 禁用静态节点提升
                    cacheHandlers: false // 禁用事件处理器缓存
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
        open: false,
        cors: true,
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        // 添加更详细的构建配置
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    const extType = assetInfo.name?.split('.')[1];
                    if (extType) {
                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                            return 'assets/images/[name]-[hash][extname]';
                        }
                        if (/css/i.test(extType)) {
                            return 'assets/css/[name]-[hash][extname]';
                        }
                        if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
                            return 'assets/fonts/[name]-[hash][extname]';
                        }
                    }
                    return 'assets/[name]-[hash][extname]';
                },
            }
        }
    }
});