<div align="center">

<img src="./images/logo.png" height="300" width="300"></img>

[![Deploy app to GitHub Pages](https://github.com/syngenta/circleci-config-visualizer/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/syngenta/circleci-config-visualizer/actions/workflows/deploy.yml)
[![Stars](https://custom-icon-badges.herokuapp.com/github/stars/syngenta/circleci-config-visualizer?logo=star&style=social&logoColor=black)](https://custom-icon-badges.herokuapp.com/github/stars/syngenta/circleci-config-visualizer?logo=star&style=social&logoColor=black)

# CircleCI Config Visualizer
</div>

<br />

The `circleci-config-visualizer` is a webapp that can be used to visualize circlei `config.yml` files. It provides a clear overview of CI workflows and jobs in the config files.


Built using `Reactjs`, `Redux`, and `Typescript`.

<br />

## How to use 📝
1. Go to **https://syngenta.github.io/circleci-config-visualizer**

2. Click on **Upload** button and choose your config file to visualize:

    ![Homepage](https://github.com/syngenta/circleci-config-visualizer/blob/main/images/homepage.png)

3. The file gets opened in a visual editor:

    ![Visualized file](https://github.com/syngenta/circleci-config-visualizer/blob/main/images/visualized_file.png)

<br />

## Folder structure 📁
```
my-app/
├─ node_modules/
├─ public/
├─ src/
│  ├─ components/
|  |  ├─ ...
|  |  ├─ Widgets/
│  ├─ data/
│  ├─ pages/
│  ├─ redux/
│  ├─ utils/
│  ├─ index.css
│  ├─ index.tsx
│  ├─ App.tsx
│  ├─ App.css
├─ .gitignore
├─ package.json
├─ README.md
├─ ...
```

### The `src` directory:
 1. `components` - Contains all react components. Contains a `Widgets` folder where all reusable widgets like toggle switches, inputs, buttons, etc. are kept.
 2. `data` - Contains all files that serve static data in the application.
 3. `pages` - Contains actual pages that compose of components and are used in react router navigation.
 4. `redux` - Contains all the files related to redux, store, slices, reducers, etc.
 5. `utils` - Contains reusable utility functions which are frequently used anywhere and serve a specific purpose.

<br />

## Contributing 📌
See **[CONTRIBUTING.md](./CONTRIBUTING.md)** file for understanding how to contribute.

<br />

## License 🔐
This project is licensed under the MIT License. See the **[LICENSE](./LICENSE)** file for more details.