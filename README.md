# FIFO Queue

This is a full stack simple project. It is handling a FIFO queue with a React UI and a Node/Express backend.
It does not use any database, it is using a simple array to store the queue.

## Requirements

- Install **NodeJS** (version **>= 14**)
- Have port **3000** available
- Have port **5000** available

## Start

To start the project run the following command (it will install all the dependencies and start the backend & frontend servers):

```
npm start
```

## Tests

To run the tests run the following command (it will run the tests for the backend & frontend):

```
npm run test
```

## Optimizations

The code is not optimized, for example, we could imagine that once the queue is empty, the frontend stops calling the backend to get updates.

Moreover, the backend only handles one user, it is not made for several users at the moment. It could be improved by using a database such as Redis to store a queue for each users.

On the logic side, the main queue could be improved by using one sub-queue per actions, so actions without credits do not block the queue.

## PS

I did not use any environment variables as this project is not suposed to be deployed.
