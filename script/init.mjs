import {parseArgs, readFile, spawnSync, spawn} from "./utils.mjs";

const {httpPort = "8545"} = parseArgs(process.argv);

const genesis = JSON.parse(readFile("genesis.json"));
const networkId = genesis.config.chainId;

spawnSync("geth", [
	"dumpconfig", "--datadir", "data", "--http", "--http.port", httpPort,
	"--http.addr", "0.0.0.0", "--networkid", networkId, "config.toml"
])
spawnSync("geth", ["init", "--datadir", "data", "genesis.json"])
