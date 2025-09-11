import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(configEnv => {
    // 빈 청크 제외
    const emptyChuck = ['react-router-dom', 'set-cookie-parser', 'cookie', 'popperjs', 'prop-types', 'shallowequal', 'tiny-invariant']

    return {
        plugins: [
            react(),
            tsconfigPaths(),
            svgr(),
            checker({
                typescript: {
                    tsconfigPath: './tsconfig.json',
                    buildMode: true // 빌드 기준으로 전체 타입 체크하게 함
                }
            })
        ],
        server: {
            allowedHosts: ['bgtpicker.psytune.co.kr'],
            headers: {
                'Content-Security-Policy':
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://bgtpicker.psytune.co.kr; style-src 'self' 'unsafe-inline'; font-src 'self' data:;",
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block'
            }
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: id => {
                        if (id.includes('node_modules')) {
                            let packageName = id.split('node_modules/')[1].split('/')[0]
                            if (packageName.includes('@')) packageName = packageName.split('@')[1]
                            return !emptyChuck.includes(packageName) ? packageName : null
                        }
                    }
                }
            },
            minify: 'esbuild',
            esbuild: {
                drop: configEnv.mode === 'development' ? [] : ['console', 'debugger'],
                sourcemap: configEnv.mode === 'development'
            }
        },
        resolve: {
            dedupe: ['react', 'react-dom']
        }
    }
})
