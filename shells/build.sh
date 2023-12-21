
# 解析参数
directory=$1
cd "$directory" || exit 1

name=$2

docker build -f ./Dockerfile -t "$name" .
