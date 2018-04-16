
const Environments = [
    {
        name: 'Development',
        route: 'https://pivotus.dev.engage.pivotus.io/api',
    },
    {
        name: 'QA',
        route: 'https://pivotus.qa.engage.pivotus.io/api',
    },
    {
        name: 'Platform',
        route: 'https://pivotus.plat.engage.pivotus.io/api',
    },
]

const Services = [
    {
        name: 'Auth',
        route: 'auth',
    },
    {
        name: 'Chat',
        route: 'conversations',
    },
    {
        name: 'Users',
        route: 'users',
    },
    {
        name: 'Profile',
        route: 'profiles',
    },
    {
        name: 'Agents',
        route: 'agents',
    },
    {
        name: 'Notification',
        route: 'notification',
    }
]

export {
    Environments,
    Services,
} 