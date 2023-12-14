
import {spawn as _spawn, spawnSync as _spawnSync} from "child_process"
import fs from "fs"
import path from "path"

import dotenv from "dotenv"
dotenv.config()

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';
const isLinux = process.platform === 'linux';

export const env = process.env.NODE_ENV || "test"
export const cwd = process.env.CWD || `../geth/${env}`

export function parseArgs(argv) {
	const res = {};
	for (let i = 2; i < argv.length; i++) {
		let arg = argv[i].split('=');
		if (arg.length > 1) res[arg[0]] = arg[1];
	}
	return res;
}

export function spawnSync(command, args = [], options = {}) {
	let res
	if (isWindows) res = _spawnSync(command, args, {...options, cwd})
	else res = _spawnSync(command.split(".")[0], args, {...options, cwd})
	console.log(`[spawn] ${command} ${args.join(" ")} :`, res.stdout.toString())
	return res
}
export function spawn(command, args = [], options = {}) {
	let res
	if (isWindows) res = _spawn(command, args, {...options, cwd})
	else res = _spawn(command.split(".")[0], args, {...options, cwd})

	const key = randomString(8)
	console.log(`[spawn] ${command} ${args.join(" ")} :`, key)
	res.stdout.on("data", (buffer) => {
		console.log(`[${key}]:`, buffer.toString())
	})
	res.stderr.on('data', (err) => {
		console.log(`[${key}:E]:`, err.toString())
	})
	return res
}

export function readFile(filePath) {
	return fs.readFileSync(path.join(cwd, filePath), 'utf-8');
}
export function writeFile(filePath, content) {
	fs.writeFileSync(path.join(cwd, filePath), content, 'utf-8');
}

function randomString(
	len = 32, chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/) {
	const maxPos = chars.length;

	let res = '';
	for (let i = 0; i < len; i++)
		res += chars.charAt(Math.floor(Math.random() * maxPos));
	return res;
}
