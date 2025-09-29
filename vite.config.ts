import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig(configEnv => {

    return {
        plugins: [
            react(),
            tsconfigPaths()
        ],
        server: {
            allowedHosts: ['bgtpicker.psytune.co.kr', 'localhost', '127.0.0.1'],
            headers: {
                'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://bgtpicker.psytune.co.kr; style-src 'self' 'unsafe-inline'; font-src 'self' data:;",
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block'
            }
        },
        build: {
            minify: 'esbuild',
            esbuild: {
                drop: configEnv.mode === 'production' ? ['console', 'debugger'] : [],
                sourcemap: configEnv.mode === 'development'
            }
        },
        resolve: {
            dedupe: ['react', 'react-dom']
        }
    }
})
