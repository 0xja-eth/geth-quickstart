# 使用预构建的go-ethereum镜像
FROM ethereum/client-go:latest

WORKDIR /root

COPY data/keystore /root/data/keystore
COPY genesis.json /root/genesis.json
COPY .password /root/.password

COPY ./scripts /root/scripts

# 暴露端口
EXPOSE 8545 8546 30303 30303/udp

# 设置卷
#VOLUME /root/data

# 安装jq
RUN apk add --no-cache jq

RUN chmod +x /root/scripts/start.sh
RUN chmod +x /root/scripts/init.sh

# 初始化命令（使用您的genesis.json文件）
RUN sh ./scripts/init.sh

# 设置启动命令
CMD ["./scripts/start.sh"]
