
# Simple Task Manager Tool

A small task manager built as a part of a backend internship application.


## Run Locally

- Clone the project

```bash
  git clone https://github.com/chhavitekriwal/basic-task-manager.git
```

- Go to the project directory
```bash
  cd basic-task-manager
```
- Make a copy of `.env.template` and fill your MongoDB connection URI.

```bash
  cp .env.template .env
```

- Install dependencies

```bash
  yarn install
```

- Start the server

```bash
  yarn start
```


## API Reference

Complete API reference can be found [here](https://documenter.getpostman.com/view/20079745/2s93JwPNBA)
#### Get all items

```http
  GET /api/tasklist
```

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `searchText` | `string` | Your search query string |
|`limit`|`number`|No. of records per page|
| `page`|`number`|Page number|

#### Create new task list

```http
  POST /api/createtasklist
```
Request Body:
| Field | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of list |
|`description`|`string`|Description of what the list contains|
|`active`|`Boolean`|Whether the list is active|

#### Create new task

```http
  POST /api/createtask
```
Request Body:
| Field | Type |Description|
| :------- | :------ | :----------------------|
|`name`     | `string`| **Required**. Name of task |
|`description`| `string`| Task description|
|`periodType`| `string`|monthly, quarterly or yearly|
|`period`|`string`|`Mon Year`, `QQ Year` or `Year` respectively|
|`dueDate`|`string`|`dd-mm-yyyy` strictly after end of period|
|`taskListId`|`string`|ID of list to which task belongs|

## Improvements
* Feature: Mark task as completed
* Feature: Support task repetition
