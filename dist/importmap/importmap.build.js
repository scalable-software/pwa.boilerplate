/**
 * Browser do not support external import maps yet.
 * The inject function is a synchronous function that will be used to inject the import map into the html file used for demo.
 * The references used in the importmap maybe a local file, a NPM package path or a CDN path.
 */
inject(
  {
    imports: {
      "@scalable.software/web.component":
        "./node_modules/@scalable.software/web.component/dist/Index.js",
      "@scalable.software/app": "./dist/code/Index.js",
    },
  },
  "importmap"
);
