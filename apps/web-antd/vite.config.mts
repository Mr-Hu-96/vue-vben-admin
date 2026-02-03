import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            // target: 'http://192.168.1.218:1001/prod-api',
            target: 'http://10.168.1.175:8088',
            ws: true,
          },
        },
      },
    },
  };
});
