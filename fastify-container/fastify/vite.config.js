import {defineConfig} from "vite";

export default defineConfig({

	server: {
		 host: "0.0.0.0", // For Linux
		//host: true, // For Windows
		port: 3001, // Vite must run on a diff port
		strictPort: true,
		hmr: {
			host: 'localhost'
		}
	}
});
