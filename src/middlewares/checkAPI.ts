import { NextFunction, Request, Response } from "express";
import { errorResponse, processException } from "../utils/common";

const checkAPI =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { apisecretkey } = req.headers;
      const secretKey = process.env.API_SECRET ?? "OXUngNi992ArPXLF24f18uPpHsD0NC66MLKYeu8l";
      if (apisecretkey !== secretKey) {
        return errorResponse(res, "API Access denied!");
      }

      next();
    } catch (error) {
      processException(res, error);
    }
  };
export default checkAPI;
