const axios = require('axios');
const fs = require('fs');

const sleepMs = 500;
const banks = [
    {
        name: "Commbank",
        url: "https://api.commbank.com.au/cds-au/v1/banking"
    },
    {
        name: "Westpac",
        url: "https://digital-api.westpac.com.au/cds-au/v1/banking"
    },
    {
        name: "ANZ",
        url: "https://api.anz/cds-au/v1/banking"
    },
    {
        name: "NAB",
        url: "https://openbank.api.nab.com.au/cds-au/v1/banking"
    }
];

const server = axios.create({
    timeout: 5000,
    headers: {'x-v': '1'}
});

const productsFor = async (bank) => {
    return await server.get(`${bank.url}/products?page-size=300`);
};

// Write product to disk
const writeProduct = async (bank, product) => {

    const directory = `products/${bank.name}`;
    const fileName = `${directory}/${product.name}.json`;
    fs.mkdir(directory, {recursive: true}, () => {
        // if (err) throw err;
        server.get(`${bank.url}/products/${product.productId}`)
            .then((response) => {
                fs.writeFile(fileName, JSON.stringify(response.data, undefined, 2), (err) =>{
                    if (err) throw err;
                    console.log('Saved!');
                });
            })
            .catch((error) => {
                console.log(`${fileName} Failed`);
                console.log(error.request)
            });
    });
}

// Sleep for the given
sleep = () => {
    return new Promise(resolve => {
        setTimeout(resolve, sleepMs);
    });
}

// Main function
const iterateBanks = async () => {

    for (const bank of banks) {
        const response = await productsFor(bank);
        for (const product of response.data.data.products) {
            writeProduct(bank, product);
            await sleep();
        }
    }
};

iterateBanks();
