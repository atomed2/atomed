import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	publicDir: false,
	plugins: [svelte()],
	build: {
		outDir: "./frontend-dist/",
		assetsDir: "bundle",
		reportCompressedSize: true
	}
})
