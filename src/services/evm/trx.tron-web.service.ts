//@ts-ignore
import TronWeb from "tronweb";

import {
  generateErrorResponse,
  generateSuccessResponse,
} from "../../utils/commonObject";
import { error } from "console";

const initializeTronWeb = async (rpcUrl: string) => {
  const tronWeb = new TronWeb({
    fullHost: rpcUrl,
    headers: {
      "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY,
    },
  });
  return tronWeb;
};

const amountConvertToSun = async (tronWeb: any, amount: number) => {
  return parseFloat(tronWeb.toSun(amount));
};

const createTrxAddress = async (rpcUrl: string) => {
  try {
    const tronWeb = await initializeTronWeb(rpcUrl);
    const response = await tronWeb.createAccount();

    if (response) {
      const data = {
        address: response.address.base58,
        pk: response.privateKey,
      };

      return generateSuccessResponse("TRC Wallet created successfully", data);
    } else {
      return generateErrorResponse("TRC Wallet not generated");
    }
  } catch (err:any) {
    console.log(err);
    return generateErrorResponse(err.stack);
  }
};

const getTrxBalance = async (rpcUrl: string, address: string) => {
  try {
    const tronWeb = await initializeTronWeb(rpcUrl);
    let balance = await tronWeb.trx.getBalance(address);

    if (balance) {
      balance = parseFloat(tronWeb.fromSun(balance));
      return generateSuccessResponse("Balance get successfully", balance);
    } else {
      return generateErrorResponse("Balance get failed", balance);
    }
  } catch (err:any) {
    console.log(err);
    return generateErrorResponse(err.stack);
  }
};

const sendTrxCoin = async (
  rpcUrl: string,
  toAddress: string,
  amount: number,
  privateKey: string
) => {
  try {
    const tronWeb = await initializeTronWeb(rpcUrl);
    const amountSun = await amountConvertToSun(tronWeb, amount);
    const checkAddress = await tronWeb.isAddress(toAddress);
    
    if (checkAddress) {
      // return generateSuccessResponse("Send trx success testing", []);
      const response = await tronWeb.trx.sendTransaction(
        toAddress,
        amountSun,
        privateKey,
        );
      if (response && response.result == true) {
        const data = {
          hash: response.txid,
        };
        return generateSuccessResponse("Send trx success", data);
      } else {
        return generateErrorResponse("Send trx failed");
      }
    } else {
      return generateErrorResponse("Invalid address");
    }
  } catch (err:any) {
    console.log(err);
    return generateErrorResponse(err.stack);
  }
};

const getTrxAddressByPk = async (rpcUrl: string, privateKey: string) => {
  try {
    const tronWeb = await initializeTronWeb(rpcUrl);

    if (privateKey) {
      const response = await tronWeb.address.fromPrivateKey(privateKey);

      if (response) {
        const data = {
          address: response,
        };
        return generateSuccessResponse("TRC data get successfully", data);
      } else {
        return generateErrorResponse("Data get failed");
      }
    } else {
      return generateErrorResponse("Pk is required");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return generateErrorResponse(error.stack);
  }
};

const getTrxAccount = async (rpcUrl: string, address: string) => {
  try {
    const tronWeb = await initializeTronWeb(rpcUrl);

    if (address) {
      const response = await tronWeb.trx.getAccount(address);

      if (response) {
        return generateSuccessResponse("TRC data get successfully");
      } else {
        return generateErrorResponse("Data get failed");
      }
    } else {
      return generateErrorResponse("Address is required");
    }
  } catch (error) {
    return generateErrorResponse(error.stack);
  }
};

const checkTrxAddress = async (rpcUrl: string, address: string) => {
  try {
    const tronWeb = await initializeTronWeb(rpcUrl);

    if (address) {
      const response = await tronWeb.isAddress(address);
      if (response) {
        return generateSuccessResponse("Address valid", response);
      } else {
        return generateErrorResponse("Address not found");
      }
    } else {
      return generateErrorResponse("Address is required");
    }
  } catch (error) {
    return generateErrorResponse(error.stack);
  }
};

const getTrxTransactionBlock = async (
  rpcUrl: string,
  txId: string | null = "trx_hash"
) => {
  try {
    const tronWeb = await initializeTronWeb(rpcUrl);
    const transaction = await tronWeb.trx.getTransaction(txId);
    if (transaction) {
      return generateSuccessResponse(
        "Transaction details get successfully",
        transaction
      );
    } else {
      return generateErrorResponse('Transaction getting failed');
    }
  } catch (error:any) {
    console.log(error);
    return generateErrorResponse(error.stack);
  }
};

const checkTrxDepositByBlockNumber = async(rpcUrl:string,blockNumber?:number) => {
  const tronWeb = await initializeTronWeb(rpcUrl);
  let blockNum:any = blockNumber;
  if(!blockNumber || blockNumber == 0) {
    blockNum = await getTrxCurrentBlockNumber(tronWeb);
  } 
  return await getTrxTransactionByBlockNumber(tronWeb,blockNum);
}

const getTrxTransactionByBlockNumber = async(tronWeb:any,blockNumber:number) => {
  try {
    let block = await tronWeb.trx.getBlockByNumber(blockNumber);
    if (!block) generateErrorResponse('Failed to get block');
    block.block_number = blockNumber;
    return generateSuccessResponse("Block get successfully", block);
  } catch(err:any) {
    console.log('getBlockByNum ex =>' , error)
    return generateErrorResponse(err.stack ?? "Something went wrong");
  }
}

const getTrxCurrentBlockNumber = async(tronWeb:any) => {
  let latestBlockNumber = 0;
  const block = await tronWeb.trx.getCurrentBlock();
  if (block && block.block_header) {
     latestBlockNumber = block.block_header.raw_data.number; 
  }
  return latestBlockNumber;
}

// get web3 block number
const getTrcLatestBlockNumber = async(rpcUrl:any) => {
  const tronWeb = await initializeTronWeb(rpcUrl);
  let blockNumber = await getTrxCurrentBlockNumber(tronWeb);
  return blockNumber;
}

const getTrxCurrentBlockNumberByRpcUrl = async(rpcUrl:any) => {
  let latestBlockNumber = 0;
  try {
    const tronWeb = await initializeTronWeb(rpcUrl);
    
    const block = await tronWeb.trx.getCurrentBlock();
    if (block && block.block_header) {
      latestBlockNumber = block.block_header.raw_data.number; 
    }
    
  } catch(err:any) {
    console.log('getTrxCurrentBlockNumberByRpcUrl err', err.stack);
    return generateErrorResponse(err.stack ?? "Something went wrong");
  }
  if (latestBlockNumber > 0) {
    return generateSuccessResponse("Block get successfully", latestBlockNumber);
  }
  return generateErrorResponse("Something went wrong");
}


const getTrxTransactionBlockRange = async(rpcUrl:string,fromBlockNumber:number,toBlockNumber:number) => {
  const blockData = {
    from_block_number:fromBlockNumber,
    to_block_number:toBlockNumber,
  }
  try {
    const tronWeb = await initializeTronWeb(rpcUrl);
    const transactions = await tronWeb.trx.getBlockRange(fromBlockNumber, toBlockNumber);
    let data = [];
    if (transactions.length > 0) {
      transactions.forEach( (transaction:any) => {
        if (transaction.transactions && transaction.transactions.length > 0) {
            data = [...data, ...transaction.transactions]
        }
      })
    }
    const result = {
      transactions:data,
      blockData: blockData
    }
    return generateSuccessResponse("Block get successfully", result);
  } catch(err:any) {
    console.log('getTrxTransactionBlockRange ex =>' , error)
    return generateErrorResponse(err.stack ?? "Something went wrong");
  }
}

export {
  initializeTronWeb,
  amountConvertToSun,
  createTrxAddress,
  getTrxBalance,
  sendTrxCoin,
  getTrxAddressByPk,
  getTrxAccount,
  checkTrxAddress,
  getTrxTransactionBlock,
  checkTrxDepositByBlockNumber,
  getTrcLatestBlockNumber,
  getTrxCurrentBlockNumberByRpcUrl,
  getTrxTransactionBlockRange
};