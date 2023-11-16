import { Request, Response } from 'express';

import { pokeApi } from '../../api';

const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id === '') {
      throw new Error('Unkown Params');
    }

    const detailRes = await pokeApi.get(`/pokemon/${id}`);

    if (!detailRes) {
      throw new Error('Connecting Fail');
    }

    const species = await pokeApi.get(`/pokemon-species/${id}`);
    const descriptionKor = species.data.flavor_text_entries.filter(
      (it: any) => it.language.name === 'ko'
    );
    const description =
      descriptionKor.length > 0
        ? descriptionKor[0].flavor_text
        : species.data.flavor_text_entries[0].flavor_text;
    const nameKor = species.data.names.filter(
      (it: any) => it.language.name === 'ko'
    );
    const name =
      nameKor.length > 0 ? nameKor[0].name : species.data.names[0].name;

    const types = await Promise.all(
      detailRes.data.types.map(async (it: any) => {
        const typeRes = await pokeApi.get(it.type.url);

        const typeKor = typeRes.data.names.filter(
          (it: any) => it.language.name === 'ko'
        );
        const nameKor = typeKor.length > 0 ? typeKor[0].name : it.type.name;

        return {
          name: it.type.name,
          nameKor: nameKor,
        };
      })
    );

    res.json({
      id: detailRes.data.id,
      image: detailRes.data.sprites.other['official-artwork'],
      types: types,
      description: description,
      name: name,
    });
  } catch (err: any) {
    res.status(500).json({
      code: 201,
      message: err.message,
    });
  }
};

export default detail;
