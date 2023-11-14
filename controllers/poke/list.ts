import { Request, Response } from 'express';

import { pokeApi } from '../../api';

const list = async (req: Request, res: Response) => {
  try {
    if (!req.params.limit || !req.params.offset) {
      throw new Error('Unkown Params');
    }

    const apiRes = await pokeApi.get(
      `/pokemon?limit=${req.params.limit}&offset=${req.params.offset}`
    );

    if (!apiRes) {
      throw new Error('Connecting Fail');
    }

    const data = {
      items: apiRes.data,
      count: apiRes.data.length,
    };

    res.json(data);
  } catch (err: any) {
    res.status(500).json({
      code: 201,
      message: err.message,
    });
  }
};

export default list;
