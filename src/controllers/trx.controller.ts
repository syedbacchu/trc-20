import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/common";
import prisma from "../client";
import { checkTrxAddressByPrivateKey, checkTrxAddressValidOrNot, checkTrxBalanceByAddress, checkTrxTransactionByTxHash, createAddress, getManyBlockTransactionData, getSingleBlockTransactionData, getTrxAccountByAddress, getTrxLatestBlockNumber, sendTrxCoinToAddress } from "../../src/services/trx.service";


const createCoinAddress = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    const response = await createAddress (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

const checkCoinBalance = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    if(!request.address) {
        return errorResponse(res,'Address is required');
    }
    const response = await checkTrxBalanceByAddress (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

const transferCoin = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    if(!request.address) {
        return errorResponse(res,'Recipient address is required');
    }
    if(!request.amount) {
        return errorResponse(res,'Amount is required');
    }
    if(!request.pk) {
        return errorResponse(res,'Sender private key is required');
    }
    const response = await sendTrxCoinToAddress (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

const checkPrivateKeyByAddress = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    if(!request.pk) {
        return errorResponse(res,'Address private key is required');
    }
    const response = await checkTrxAddressByPrivateKey (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

const checkAccountByAddress = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    if(!request.address) {
        return errorResponse(res,'Address is required');
    }
    const response = await getTrxAccountByAddress (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

const checkAddressValidation = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    if(!request.address) {
        return errorResponse(res,'Address is required');
    }
    const response = await checkTrxAddressValidOrNot (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

const checkTransactionByHash = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    if(!request.transaction_hash) {
        return errorResponse(res,'Transaction hash is required');
    }
    const response = await checkTrxTransactionByTxHash (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

const getSingleBlockData = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    if(!request.block_number) {
        return errorResponse(res,'Block number is required');
    }
    const response = await getSingleBlockTransactionData (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

const getLatestBlockNumber = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    if(!request.block_number) {
        return errorResponse(res,'Block number is required');
    }
    const response = await getTrxLatestBlockNumber (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

const getTxDataByBlockRange = async(req: Request, res: Response) => {
    let request:any = req.body;
    if(!request.rpc_url) {
        return errorResponse(res,'Rpc url is required');
    }
    if(!request.from_block_number) {
        return errorResponse(res,'From block number is required');
    }
    if(!request.to_block_number) {
        return errorResponse(res,'To block number is required');
    }
    const response = await getManyBlockTransactionData (request);
    if(response.success) {
        return successResponse(res,response.message,response.data);
    } else {
        return errorResponse(res,response.message,response.data);
    }
}

export default {
    createCoinAddress,
    checkCoinBalance,
    transferCoin,
    checkPrivateKeyByAddress,
    checkAccountByAddress,
    checkAddressValidation,
    checkTransactionByHash,
    getSingleBlockData,
    getLatestBlockNumber,
    getTxDataByBlockRange
}