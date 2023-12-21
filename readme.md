# Shell 指令
## 创建钱包
1. 在与 genesis.json 同级的目录下添加一个 .password 文件为你的密码
2. 执行指令：
``` 
sh ./scripts/add.sh path/to/your/genesis {balance=0} {isAuthNode=false}
```
比如：
``` 
sh ./scripts/add.sh ./geth/test 1000000000000 true
```
就会在 ./geth/test 目录下创建一个钱包，余额为 1000000000000，是验证节点

## 导入钱包
1. 在与 genesis.json 同级的目录下添加一个 .password 文件为你的密码
2. 在与 genesis.json 同级的目录下添加一个 .privateKey 文件为你的私钥
   3执行指令：
``` 
sh ./scripts/add.sh path/to/your/genesis {balance=0} {isAuthNode=false} .privateKey
```
比如：
``` 
sh ./scripts/add.sh ./geth/test 1000000000000 false .privateKey
```
就会在 ./geth/test 目录下导入一个钱包，余额为 1000000000000，不是验证节点
## 初始化区块链
```
sh ./scripts/init.sh path/to/your/genesis {port=8545}
```
## 启动
```
sh ./scripts/start.sh path/to/your/genesis {mine=false} {extra}
```
其中，mine 为 true 时，会自动挖矿，extra 为额外的参数，比如 --rpc --rpcaddr console 等参数
比如，我想启用自动挖矿，并且打开JS控制台，就可以这样：
```
sh ./scripts/start.sh ./geth/test true console
```
# NPM 指令
## 安装依赖
``` shell
npm install
```
## 创建钱包
1. 在与 genesis.json 同级的目录下添加一个 .password 文件为你的密码
2. 执行指令：
``` 
npm run new-account
```
## 导入钱包
1. 在与 genesis.json 同级的目录下添加一个 .password 文件为你的密码
2. 在与 genesis.json 同级的目录下添加一个 .privateKey 文件为你的私钥
3执行指令：
``` 
npm run new-account
```
## 初始化区块链
```
npm run init
```
## 启动
```
npm run start
```
## 启动并自动挖矿
```
npm run mine
```
# 原生 Shell 指令
## 创建账户
``` shell
geth account new --datadir data
```
## 初始化区块链
``` shell
geth init --datadir data genesis.json
```
## 启动并进入控制台
``` shell
geth --config config.toml --miner.etherbase <Your Address> --unlock <Your Address> --password .password --allow-insecure-unlock console
```
## 启动并自动挖矿
``` shell
geth --config config.toml --mine --miner.etherbase <Your Address> --unlock <Your Address> --password .password --allow-insecure-unlock console
```
## 开始挖矿
进入 geth js console 之后执行：
``` javascript
miner.start()
```
## 结束挖矿
进入 geth js console 之后执行：
``` javascript
miner.stop()
```
