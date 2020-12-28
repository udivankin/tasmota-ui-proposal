import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import csso from 'csso';

import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

function inlineSvelte() {
	function replace(string, search, replace) {
		return string.split(search).join(replace);
	}

	return {
		name: 'Svelte Inliner',
		generateBundle(opts, bundle) {
			const globalCssPath = path.resolve(__dirname, './public/global.css');
			const template = path.resolve(__dirname, './public/index.tpl');
			const outputPath = path.resolve(__dirname, './public/build/index.html');
			const outputPathGz = path.resolve(__dirname, './public/build/index.html.gz');
			const scripts = bundle['bundle.js'].code;
			const styles = bundle['bundle.css'].source;
			const globalStyles = fs.readFileSync(globalCssPath, 'utf-8');
			const title = opts.name;
			let output = fs.readFileSync(template, 'utf-8');
			output = replace(output, '{{title}}', title);
			output = replace(output, '{{styles}}', csso.minify(styles).css);
			output = replace(output, '{{globalStyles}}', csso.minify(globalStyles).css);
			output = replace(output, '{{scripts}}', scripts);
			fs.writeFileSync(outputPath, output, 'UTF8');
			fs.writeFileSync(outputPathGz, zlib.gzipSync(output, { level: 9 }), 'UTF8');
		}
	}
}


export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'Tasmota',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		production && inlineSvelte(),
	],
	watch: {
		clearScreen: false
	}
};
