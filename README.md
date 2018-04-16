
This app simply monitors the statuses of the services endpoints.

### Instalation

```
yarn 
yarn start
```

### Add environments

Add your new environment information to `/src/config.js`.

```
const Environments = [
    {
        name: 'Development',                                // Name of environment
        route: 'https://pivotus.dev.engage.pivotus.io/api', // Environment route
    },
]

```

### Add services

Add your new service information to `/src/config.js`.

```
const Services = [
    {
        name: 'Auth',     // Name of the service
        route: 'auth',    // service route used to fetch specific service (ie https://pivotus.dev.engage.pivotus.io/api/auth/status)
    },
]
```
