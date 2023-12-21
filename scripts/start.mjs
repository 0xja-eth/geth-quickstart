import {parseArgs, readFile, spawn, spawnSync} from "./utils.mjs";

const {mine} = parseArgs(process.argv);

const genesis = JSON.parse(readFile("genesis.json"));

const eLen = genesis.extradata.length;
const authAddressesStr = genesis.extradata.slice(66, eLen - 130);
const authAddress = authAddressesStr.match(/.{1,40}/g)[0];

if (mine.toLowerCase() === "true") {
	const geth = spawn("geth", ["--config", "config.toml",
		"--mine", "--miner.etherbase", authAddress, "--unlock", authAddress,
		"--password", ".password", "--allow-insecure-unlock", "console"])
	// geth.stdout.on("data", (buffer) => {
	// 	const str = buffer.toString();
	// 	if (str.includes("Welcome to the Geth JavaScript console")) {
	// 		geth.stdin.write("eth.accounts\n")
	// 		geth.stdin.write("miner.start()\n")
	// 	}
	// })
} else
	spawn("geth", ["--config", "config.toml"])
