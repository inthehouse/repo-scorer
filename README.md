# a simple github repo scorer

scores repositories based on stars, forks, and recency of updates. 
project was created with `typescript` and `nodejs`<br/>
`stars` contribute `50%` to the score.<br/>
`forks` contribute `30%` to the score.<br/>
`recency` contributes `20%` to the score.<br/>

## how to run

In the project directory, you can run:

### `npm install`
to install all dependencies

### `npm start`
to start the env

### `npm test`
to run all tests

## how to use
you can use a url looking like this:<br/>
`http://localhost:3000/repositories?query=test&language=typescript&created=2024-01-10`

three parameters are required: <br/>
- `query`: requires a `string`
- `language`: requires a `string`
- `created`: requires a date as `string` in `YYYY-MM-DD` format (2024-01-10)
