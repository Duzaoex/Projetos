import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';

import { CategoryResponse } from '../../types';

type SidebarProp = {
  filterByCategory: (categoryID: string) => void,
};

function Sidebar({ filterByCategory }: SidebarProp) {
  const [categoryList, setCategoryList] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const categorysResponse = await getCategories();
      setCategoryList(categorysResponse);
    };
    getCategory();
  }, []);

  return (
    <aside>
      <ul>
        {categoryList.map((category) => {
          return (
            <li key={ category.id }>
              <button
                data-testid="category"
                onClick={ () => filterByCategory(category.id) }
              >
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
