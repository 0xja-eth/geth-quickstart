#!/bin/sh

# 解析命令行参数以获取HTTP端口，默认为8545
httpPort=${1:-8545}

# 读取并解析genesis.json文件以获取网络ID
genesis=$(cat genesis.json)
networkId=$(echo "$genesis" | jq -r '.config.chainId')

# 配置Geth
geth dumpconfig --datadir data --http --http.port "$httpPort" \
    --http.addr "0.0.0.0" --networkid "$networkId" --nodiscover > config.toml

# 初始化Geth节点
geth init --datadir data genesis.json
