import { Request, Response } from 'express';

import { pokeApi } from '../../api';

const list = async (req: Request, res: Response) => {
  try {
    const offset =
      typeof req.query.offset === 'string' ? parseInt(req.query.offset) : -1;
    let limit =
      typeof req.query.limit === 'string' ? parseInt(req.query.limit) : -1;
    let isLast = false;

    if (!(offset >= 0 && limit >= 0)) {
      throw new Error('Unkown Params');
    }

    if (offset >= 905) {
      throw new Error('Out of range Pokemon ID');
    }

    if (offset + limit >= 905) {
      limit = 905 - offset;
      isLast = true;
    }

    const apiRes = await pokeApi.get(
      `/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!apiRes) {
      throw new Error('Connecting Fail');
    }

    const items = await Promise.all(
      apiRes.data.results.map(async (it: any) => {
        const id = it.url.split('/')[6];
        const species = await pokeApi.get(`/pokemon-species/${id}`);
        return {
          ...it,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          nameKor: species.data.names[2].name,
          id: id,
        };
      })
    );

    const data = {
      items: items,
      count: apiRes.data.count,
      next: isLast ? null : apiRes.data.next,
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
