# Open Banking product scraper

This is not supposed to be production code... I created this to get a feel as to what
our banks are providing in regards to product data.


## How to run

I created this using node version ~12, and I am not sure what version you will need to run it, there's nothing
too fancy here so any reasonable version should be fine.

```bash
npm install
npm start
```
## What to expect

This tool is fairly dumb - it will iterate over the configuration you have provided inline within
`index.js` and write out product data into `products/${bank}/${productName}.json` files.

## Configuration

`index.js` is the only file here - go have a look and change the bank metadata - ie.

```json
[
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
]
```

