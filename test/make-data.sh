#!/bin/bash 
COUNTER=0
  while [ $COUNTER -lt 100 ]; do
  mkfile -n 20m ./test/read/$COUNTER.data
  let COUNTER=COUNTER+1
done

