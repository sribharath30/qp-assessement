import { Op } from 'sequelize';
import { FilterCondition } from '../types/groceryItem';

export const buildWhereCondition = (filters: FilterCondition[]): Record<string, any> => {
    const whereCondition: Record<string, any> = {};

    filters.forEach((filter) => {
        const { field, op, value } = filter;
  
        switch (op) {
          case '>':
            whereCondition[field] = { [Op.gt]: value };
            break;
          case '<':
            whereCondition[field] = { [Op.lt]: value };
            break;
          case '=':
            whereCondition[field] = { [Op.eq]: value };
            break;
          case '>=':
            whereCondition[field] = { [Op.gte]: value };
            break;
          case '<=':
            whereCondition[field] = { [Op.lte]: value };
            break;
          case '!=':
            whereCondition[field] = { [Op.ne]: value };
            break;
          default:
            throw new Error(`Unsupported operator: ${op}`);
        }
      });
    return whereCondition;
};
