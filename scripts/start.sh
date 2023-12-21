#!/bin/bash

directory=$1
cd "$directory" || exit 1

# 解析命令行参数
mine=$2
extra=$3

# 读取genesis.json并解析授权地址
genesis=$(cat genesis.json)
extradata=$(echo "$genesis" | jq -r '.extradata')
eLen=${#extradata}
authAddressesStr=${extradata:66:eLen-130-66}
authAddress=$(echo "$authAddressesStr" | grep -oE '[a-fA-F0-9]{40}' | head -1)

# 根据参数决定是否开启挖矿
if [ "$mine" == "true" ]; then
    geth --config config.toml --mine --miner.etherbase "$authAddress" \
        --unlock "$authAddress" --password .password --allow-insecure-unlock "$extra"
else
    geth --config config.toml "$extra"
fi
