cp $(go env GOPATH)/src/github.com/Nv7-Github/Nv7haven/proto/anarchy.proto anarchy.proto
protoc --plugin="protoc-gen-ts=../../../node_modules/.bin/protoc-gen-ts" --js_out="import_style=commonjs,binary:pb" --ts_out="service=grpc-web:pb" anarchy.proto
rm anarchy.proto