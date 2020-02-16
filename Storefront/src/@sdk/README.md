# Kaavish API SDK

This package contains all queries and mutations that are used in our sample storefront. It can be used for semi-custom or fully-custom (with ability to extend existing queries) storefront solutions.

## Setup (PACKAGE CURRENTLY NOT RELEASED TO NPM)

```
npm install Kaavish-sdk
```

Create new Kaavish client by using our built-in pre-configured apollo client:

```
import { createKaavishClient } from 'Kaavish-sdk'

const client = createKaavishClient(API_URL)
```

## Usage

### React

We provide a custom hook per each query that have near identical API to `react-apollo` but are dynamically typed, with built-in error handling.

In your root file:

```
import { KaavishProvider } from 'Kaavish-sdk'
import { client } from './Kaavish'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <KaavishProvider client={client}>
    <App />
  </KaavishProvider>,
  rootElement
)
```

There are 2 types of api calls - queries and mutations.

Query (gets data):

```
const { data: TData["data"], loading: boolean, error: ApolloError } = useProductDetails(variables, options?)
```

Mutation (sets data):

```
const [
  signIn: (options?) => Promise<TData>,
  { data: TData["data"], loading: boolean, error: ApolloError, called: boolean }
] = useSignIn(options?)
```

For `options` and full api reference, navigate to [official docs](https://www.apollographql.com/docs/)

### Other frameworks

Create new KaavishAPI instance and use methods available on it

```
import { KaavishAPI } from 'Kaavish-sdk'
import { client } from './Kaavish'

export const KaavishAPI = new KaavishAPI(client)
```

```
const { data } = await KaavishAPI.getProductDetails(variables, options?)
```
