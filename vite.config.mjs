import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [{name:'original-jsx-files',enforce:'pre',async transform(code,id){if (/\/src\/.*\.js$/.test(id.replaceAll('\\','/'))) return transformWithEsbuild(code,id,{loader:'jsx',jsx:'automatic'});}},react()],
  optimizeDeps: { entries:['src/main.jsx'],esbuildOptions:{loader:{'.js':'jsx'}} },
  build:{rollupOptions:{input:{shop:'index.html',lab:'lab/index.html'}}},
  server: { port:5173,strictPort:true,watch:{ignored:['**/node_modules.legacy/**','**/output/**']},proxy:{'/api':'http://127.0.0.1:3001'} }
});
