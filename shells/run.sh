
# 解析参数
directory=$1
cd "$directory" || exit 1

name=$2
extra=$3

docker run -p 8545:8545 -p 8546:8546 -p 30303:30303 \
  -v "/data:/root/data" \
  --restart=always -d --name "$name" "$name"

#docker run -p 8545:8545 -p 8546:8546 -p 30303:30303 \
#  -v "$directory/data:/root/data" \
#  --restart=always -d --name "$name" "$name"
#  # "$extra"
