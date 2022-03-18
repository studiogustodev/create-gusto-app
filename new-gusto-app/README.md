# Gusto Boilerplate

This is a boilerplate created by Studio Gusto specifically for Wordpress & React.

## Install & Start (Backend)

The backend is based on a custom instance of WP, templating using [Timber](https://timber.github.io/docs/)

### Folder Structure

|--- app  
|--- |--- mu-plugins  
|--- |--- plugins  
|--- |--- themes  
|--- |--- uploads  
|--- wp-config.php  
|--- index.php  
|--- wp _(Insert WP Core)_

---

## Install & Start (Frontend)

The frontend is based on these libraries:

- [react](https://facebook.github.io/react/)
- [react-redux](https://react-redux.js.org/)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)
- [react-jss](https://cssinjs.org/react-jss/)

### CLI Usage

⚠️ Using [Yarn Package Manager](https://yarnpkg.com) is recommended over `npm`.

Install dependencies

```shell
cd frontend
yarn install
```

Start dev server

```shell
yarn dev
```

Create production version

```shell
yarn build
```

---
