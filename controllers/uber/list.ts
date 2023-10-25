import { Request, Response } from 'express';

import { uberApi } from '../../api';

const list = async (_: Request, res: Response) => {
  try {
    const apiRes = await uberApi.get('');

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
