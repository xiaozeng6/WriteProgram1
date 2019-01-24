#!/bin/bash
#this command line shows how to produce the js file from .proto
protoc --js_out=import_style=commonjs,binary:. EPICSEvent.proto
