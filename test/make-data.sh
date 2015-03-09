#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
COUNTER=0
while [ $COUNTER -lt 200 ]; do
    OUT=${DIR}/read/$COUNTER.data
    if [ ! -f  ${OUT} ]; then
        dd if=/dev/zero of=${DIR}/read/$COUNTER.data bs=5M count=2
    fi
    let COUNTER=COUNTER+1
done

