import { PrismaClient } from "@prisma/client";
import { generateErrorResponse, generateSuccessResponse } from "../utils/commonObject";
import { checkTrxAddress, checkTrxDepositByBlockNumber, createTrxAddress, getTrcLatestBlockNumber, getTrxAccount, getTrxAddressByPk, getTrxBalance, getTrxTransactionBlock, sendTrxCoin } from "./evm/trx.tron-web.service";

const prisma = new PrismaClient();

const createAddress = async (request:any) => {
  const rpcUrl = request.rpc_url ? request.rpc_url : 'https://api.trongrid.io/'
  const response = await createTrxAddress(rpcUrl); 
  return response;
};

const checkTrxBalanceByAddress = async (request:any) => {
  const rpcUrl = request.rpc_url ? request.rpc_url : 'https://api.trongrid.io/'
  const address = request.address ? request.address : 'TVd7XaUGURP8hgKEj8GU69S6tFarktV6s4'
  const response = await getTrxBalance(rpcUrl,address); 
  return response;
};

const sendTrxCoinToAddress = async (request:any) => {
  const rpcUrl = request.rpc_url ? request.rpc_url : 'https://api.trongrid.io/'
  const toAddress = request.address ? request.address : 'TVd7XaUGURP8hgKEj8GU69S6tFarktV6s4';
  const amount = request.amount;
  const privateKey = request.pk;
  const response = await sendTrxCoin(rpcUrl,toAddress,amount,privateKey); 
  return response;
};

const checkTrxAddressByPrivateKey = async (request:any) => {
  const rpcUrl = request.rpc_url ? request.rpc_url : 'https://api.trongrid.io/'
  const privateKey = request.pk;
  const response = await getTrxAddressByPk(rpcUrl,privateKey); 
  return response;
};

const getTrxAccountByAddress = async (request:any) => {
  const rpcUrl = request.rpc_url ? request.rpc_url : 'https://api.trongrid.io/'
  const address = request.address ? request.address : 'TVd7XaUGURP8hgKEj8GU69S6tFarktV6s4'
  const response = await getTrxAccount(rpcUrl,address); 
  return response;
};

const checkTrxAddressValidOrNot = async (request:any) => {
  const rpcUrl = request.rpc_url ? request.rpc_url : 'https://api.trongrid.io/'
  const address = request.address ? request.address : 'TVd7XaUGURP8hgKEj8GU69S6tFarktV6s4'
  const response = await checkTrxAddress(rpcUrl,address); 
  return response;
};

const checkTrxTransactionByTxHash = async (request:any) => {
  const rpcUrl = request.rpc_url ? request.rpc_url : 'https://api.trongrid.io/'
  const txHash = request.transaction_hash ? request.transaction_hash : '181502931528e845713ad8fd05b001660ce9e2932afa1a99e3e9782ef3ebd7fb'
  const response = await getTrxTransactionBlock(rpcUrl,txHash); 
  return response;
};

const getSingleBlockTransactionData = async (request:any) => {
  const rpcUrl = request.rpc_url ? request.rpc_url : 'https://api.trongrid.io/'
  const blockNumber = request.block_number ? request.block_number : 23985263
  const response = await checkTrxDepositByBlockNumber(rpcUrl,blockNumber); 
  return response;
};

const getTrxLatestBlockNumber = async (request:any) => {
  const rpcUrl = request.rpc_url ? request.rpc_url : 'https://api.trongrid.io/'
  const response = await getTrcLatestBlockNumber(rpcUrl); 
  return response;
};

export {
    createAddress,
    checkTrxBalanceByAddress,
    sendTrxCoinToAddress,
    checkTrxAddressByPrivateKey,
    getTrxAccountByAddress,
    checkTrxAddressValidOrNot,
    checkTrxTransactionByTxHash,
    getSingleBlockTransactionData,
    getTrxLatestBlockNumber
}
