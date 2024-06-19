const express = require('express');
const axios = require('axios');
const app = express();
const port = 3004;

app.use(express.json());

const register = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/register', {
      companyName: 'paruluniversity',
      ownerName: 'utkarshbarde',
      rollNo: '210305105194',
      ownerEmail: '210305105194@paruluniversity.ac.in',
      accessCode: 'QeYQhl'
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error registering:', error);
  }
};

register();


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
