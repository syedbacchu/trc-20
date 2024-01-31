import express from "express";
import validate from "../../middlewares/validate";
import authValidation from "../../validations/auth.validation";
import auth from "../../middlewares/auth";
import { authController } from "../../controllers";
import trxController from "../../controllers/trx.controller";

const router = express.Router();

router.get("/test", authController.test);
router.post("/login", validate(authValidation.login), authController.login);
router.get("/verify-token", authController.verifyToken);
router.post("/logout", validate(authValidation.logout), authController.logout);

router.post("/create-address", trxController.createCoinAddress);
router.post("/check-coin-balance", trxController.checkCoinBalance);
router.post("/send-coin", trxController.transferCoin);
router.post("/check-private-key", trxController.checkPrivateKeyByAddress);
router.post("/check-account", trxController.checkAccountByAddress);
router.post("/check-address", trxController.checkAddressValidation);
router.post("/check-transaction", trxController.checkTransactionByHash);
router.post("/check-single-block", trxController.getSingleBlockData);
router.post("/check-latest-blocknumber", trxController.getLatestBlockNumber);
router.post("/get-multiple-block-data", trxController.getLatestBlockNumber);

export default router;
