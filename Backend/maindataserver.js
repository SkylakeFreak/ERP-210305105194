const express = require('express');
const axios = require('axios');
const app = express();
const port = 3004;

app.use(express.json());

const register = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/auth', {
        companyName: 'paruluniversity',
        clientID: 'fa435d6d-69b5-40f5-b77a-f7dbbc54773f',
        clientSecret: 'yTIYZVBmehQfxlyG',
        ownerName: 'utkarshbarde',
        ownerEmail: '210305105194@paruluniversity.ac.in',
        rollNo: '210305105194'      
    });
    authToken = response.data.access_token;
  } catch (error) {
    console.error('Error registering:', error);
  }
};

register();

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n, minPrice, maxPrice, sort, order, page } = req.query;
    const apiUrl = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        const products = response.data;
        console.log(products);

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});
  
  


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
