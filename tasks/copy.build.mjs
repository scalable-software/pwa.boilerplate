#! /usr/bin/env node
import { copy } from "./copy.mjs";
await copy(["./src/**/*.css", "./src/**/*.html"], "./dist");
await copy(["./public/*.json"], "./dist");
await copy(["./public/*.css"], "./dist");
await copy(["./public/assets/icons/*.png"], "./dist/assets/icons");
await copy(["./public/assets/readme/*.png"], "./dist/assets/readme");
await copy(["./public/assets/screenshots/*.png"], "./dist/assets/screenshots");
await copy(["./public/importmap/*.js"], "./dist/importmap");
await copy(["./public/app.js"], "./dist");
