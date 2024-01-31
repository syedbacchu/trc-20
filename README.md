# Tron Api || All Essential Tron Api Integrated 
Use Web3 js with Express Js to implement all kind of tron api. It's help to check all tron api and implement at your code
## Technologies Behind
- Express Js
- Type Script
- Prisma
- Mysql
- Rest Api
- Web3 Js
- TronWeb
- TronGrid

## Requirements
- node js 16^
- PHP 8.1^
- mysql 8



## Installation Command
```bash
    yarn install
```
```bash
    yarn prisma generate
```
```bash
    yarn prisma db push
```
```bash
    yarn build
```

Then project run command is 
```bash
    yarn start
```

## General Features (api list)
- create new trx address
```bash
    /v1/auth/create-address
```
- check address balance
```bash
    /v1/auth/check-coin-balance
```
- send trx coin
```bash
    /v1/auth/send-coin
```
- check address by private key
```bash
    /v1/auth/check-private-key
```
- check account by address
```bash
    /v1/auth/check-account
```
- check address validation
```bash
    /v1/auth/check-address
```
- check transaction by transaction hash
```bash
    /v1/auth/check-transaction
```
- check all transaction from single block
```bash
    /v1/auth/check-single-block
```
- check latest block number
```bash
    /v1/auth/check-latest-blocknumber
```
- get multiple block transaction data
```bash
    /v1/auth/get-multiple-block-data
```