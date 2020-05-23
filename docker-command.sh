#!/bin/bash
ACTION='\033[1;92m'
NOCOLOR='\033[0m' # No Color

ENVIRONMENT="${ENVIRONMENT:-production}"

if [ "$ENVIRONMENT" == 'production' ]
then
  echo
  echo -e ${ACTION}Running under production settings
  echo -e {NOCOLOR}
  npm run start
else
  echo
  echo -e ${ACTION}Running under non production settings
  echo -e ${NOCOLOR}
  npm run dev
fi

