#! /usr/bin/env node
import { del } from "./del.mjs";
await del(["./dist/**/*.js", "./dist/**/*.d.ts"]);
await del(["./dist/**/*.html", "./dist/**/*.css", "./dist/**/*.png"]);
