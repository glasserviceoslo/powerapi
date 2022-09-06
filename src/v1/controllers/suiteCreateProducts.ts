import { createNewModule, getTokens } from '@v1/services/suiteRequests';
import { NextFunction, Request, Response } from 'express';

export const createSuiteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = await getTokens();

    const productData = {
      data: {
        type: 'AOS_Products',
        attributes: {
          name: req.body.name,
          description: req.body.description,
          maincode: req.body.code,
          part_number: req.body.unit,
          category: '',
          type: 'Good',
          currency_id: '',
          cost: req.body.costPrice,
          price: req.body.salesPrice,
          url: '',
          aos_product_category: '',
          aos_product_category_name: '',
          aos_product_category_id: '',
        },
      },
    };

    const product = await createNewModule(access_token, productData);
    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
};
