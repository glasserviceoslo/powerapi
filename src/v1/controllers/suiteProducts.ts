import { getProductGroupById } from '@v1/services/productsReqs';
import { createNewModule, getFilteredCategories, getTokens, updateModule } from '@v1/services/suiteRequests';
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
          aos_product_category_name: req.body.categoryName,
          aos_product_category_id: req.body.categoryId,
        },
      },
    };

    const product = await createNewModule(access_token, productData);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProductCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = await getTokens();
    const { data: group } = await getProductGroupById(req.headers.access_token, req.body.productGroupId);
    const { data: existing } = await getFilteredCategories(access_token, group.name);

    // if (req.method === 'GET') {
    //   console.log('🚀 ~ file: suiteProducts.ts ~ line 42 ~ createProductCategory ~ existing', existing);
    //   return res.json(existing);
    // }

    const categoryData = {
      data: {
        type: 'AOS_Product_Categories',
        attributes: { name: req.body.name },
      },
    };

    if (existing.length > 0) {
      const newVal = { ...categoryData, data: { id: existing[0].id, ...categoryData.data } };
      const updatedAccount = await updateModule(access_token, newVal);
      return res.status(201).json(updatedAccount);
    }
    const category = await createNewModule(access_token, categoryData);
    return res.status(201).json(category);
  } catch (error) {
    return next(error);
  }
};
