# Shell 指令
## 创建账户（一般用来挖矿）
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
