# node-async-require

[![Build Status](https://travis-ci.org/jaydenlin/node-async-require.svg?branch=master)](https://travis-ci.org/jaydenlin/node-async-require)

> Transparently `require()` remote contents (node moudles) in server-side Node.js !
 
### Concept
Fetch the remote contnets (node module) by http GET and require codes in Node.js.   
I made up the file with `.ajs` extention.
* Only for the `require.extention` to recognize the file.
* The file contents is only a remote url.
* Node.js will fetch the contents by the remote url and require codes into local.

### Highlight
* Provid the `PreParser` config for parsing remote contents before Node.js requires it.
* Privde the `queryString` config for fetching diffrent remote contents.
* Provide the `PreParser` for [react-templates](http://wix.github.io/react-templates)!
* How about isomorphic `require()` on client-side ? We got [node-async-require-loader](https://github.com/jaydenlin/node-async-require-loader) with webpack for it ! 


## Test

You can use the following command to run mocha tests.

```
npm run test
```

