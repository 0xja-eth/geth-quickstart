#!/bin/bash

# 解析参数
directory=$1
cd "$directory" || exit 1

balance=$2
isAuthNode=$3
privateKey=$4

# 设置数据目录
dataDir="data"

# 根据是否提供了私钥，运行Geth来创建新账户或导入现有账户
if [ -z "$privateKey" ]; then
    # 创建新账户
    res=$(geth account new --datadir $dataDir --password ".password")
else
    # 导入现有账户
    res=$(geth account import --datadir $dataDir --password ".password" "$privateKey")
fi

# 从Geth的输出中提取以太坊地址
if [ -z "$privateKey" ]; then
  addressRegex="0x([a-fA-F0-9]{40})"
  if [[ $res =~ $addressRegex ]]; then
    address="${BASH_REMATCH[1]}"
  fi
else
  addressRegex="{([a-fA-F0-9]{40})}"
  if [[ $res =~ $addressRegex ]]; then
    address="${BASH_REMATCH[1]}"
  fi
fi

echo "$res >> $address"

if [ -z "$address" ]; then
    echo "Failed to create or import account"
    exit 1
fi

# 如果指定了余额或标记为授权节点，则修改genesis文件
if [ ! -z "$balance" ] || [ "$isAuthNode" == "true" ]; then
    genesis=$(cat genesis.json)
    if [ ! -z "$balance" ]; then
        # 添加余额
        genesis=$(jq --arg address "$address" --arg balance "$balance" '.alloc[$address].balance = $balance' <<< "$genesis")
    fi
    if [ "$isAuthNode" == "true" ]; then
        # 添加授权节点
        extradata=$(jq -r '.extradata' <<< "$genesis")
        prefix=${extradata:0:-130}
        suffix=${extradata:(-130)}
#        address=${address:2}
        newExtradata="${prefix}${address}${suffix}"
        genesis=$(jq --arg newExtradata "$newExtradata" '.extradata = $newExtradata' <<< "$genesis")
    fi
    echo "$genesis" > genesis.json
fi
