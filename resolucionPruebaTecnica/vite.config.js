import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "path"; // Importa 'resolve'

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "template"), // Apunta a la carpeta 'template' en la raíz
    }),
  ],
});
