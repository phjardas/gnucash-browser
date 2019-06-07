# gnucash-browser

A Web Interface For GnuCash Ledgers.

This application will create a static website with a read-only view on your complete GnuCash book.

## Usage

```bash
git clone https://github.com/phjardas/gnucash-browser.git
cd gnucash-browser
npm install
```

Configure the path to your GnuCash file in [gatsby-config.js](https://github.com/phjardas/gnucash-browser/blob/master/gatsby-config.js#L11).

```bash
npm run build
```

The resulting website will be produced in the folder `public` and is ready for deployment to any webserver.

You can try out the generated page with `npm run serve`, then open http://localhost:9000/.
