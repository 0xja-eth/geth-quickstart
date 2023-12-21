
import {parseArgs, readFile, spawn, spawnSync, writeFile} from "./utils.mjs"

const {privateKey, balance, isAuthNode} = parseArgs(process.argv);

const geth = !privateKey ?
	spawnSync("geth", ["account", "new", "--datadir", "data", "--password", ".password"]) :
	spawnSync("geth", ["account", "import", "--datadir", "data", "--password", ".password", privateKey]);

const res = geth.stdout.toString();

const addressRegex = !privateKey ? /0x([a-fA-F0-9]{40})/ : /{([a-fA-F0-9]{40})}/
// const keystoreRegex = /Path of the secret key file:\s+(data\\keystore\\[^ ]+)/;

const address = res.match(addressRegex)?.[1];
// const keystorePath = res.match(keystoreRegex)?.[1];

if (balance || isAuthNode.toLowerCase() === "true") {
	const genesis = JSON.parse(readFile("genesis.json"));
	if (balance) genesis.alloc[address] = {balance};
	if (isAuthNode.toLowerCase() === "true") {
		const eLen = genesis.extradata.length;
		const prefix = genesis.extradata.slice(0, eLen - 130)
		const suffix = genesis.extradata.slice(eLen - 130)
		genesis.extradata = `${prefix}${address}${suffix}`
	}
	writeFile("genesis.json", JSON.stringify(genesis));
}
