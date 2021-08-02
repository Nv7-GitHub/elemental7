cp $(go env GOPATH)/src/github.com/Nv7-Github/Nv7haven/proto/elemental.proto elemental.proto
protoc --plugin="protoc-gen-ts=../../../node_modules/.bin/protoc-gen-ts" --js_out="import_style=commonjs,binary:pb" --ts_out="service=grpc-web:pb" elemental.proto
rm elemental.proto