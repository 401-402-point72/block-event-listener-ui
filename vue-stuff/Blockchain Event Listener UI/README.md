# Blockchain Event Listener UI

Make sure you have Node.js => 18.3  
Create a .env file within the root of the project folder and add the AWS Access Key ID and Secret Key in order to access buckets, your .env should look like this:  
```
VITE_AWS_ACCESS_KEY_ID=access key id  
VITE_AWS_SECRET_ACCESS_KEY= secret access key
```


## Project Setup

```sh
npm install
```

### Dependencies

```sh
npm i @aws-sdk/client-s3
npm install --save-dev dotenv dotenv-webpack
```
### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
