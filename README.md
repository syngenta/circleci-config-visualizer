<center>

<img src="./images/logo.png" height="300" width="300"></img>

[![Deploy app to GitHub Pages](https://github.com/syngenta/circleci-config-visualizer/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/syngenta/circleci-config-visualizer/actions/workflows/deploy.yml)
[![Stars](https://custom-icon-badges.herokuapp.com/github/stars/syngenta/circleci-config-visualizer?logo=star&style=social&logoColor=black)](https://custom-icon-badges.herokuapp.com/github/stars/syngenta/circleci-config-visualizer?logo=star&style=social&logoColor=black)

# CircleCI Config Visualizer
</center>

<br />

The `circleci-config-visualizer` is a webapp that can be used to visualize circlei `config.yml` files. It provides a clear overview of CI workflows and jobs in the config files.


Built using `Reactjs`, `Redux`, and `Typescript`.

<br />

## How to use 📝
1. Go to **https://syngenta.github.io/circleci-config-visualizer** :

<br />

2. Click on **Upload** button and choose your config file to visualize:

    ![Homepage](https://github.com/syngenta/circleci-config-visualizer/blob/main/images/homepage.png)

<br />

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

<br />

### The `src` directory:
 1. `components` - Contains all react components. Contains a `Widgets` folder where all reusable widgets like toggle switches, inputs, buttons, etc. are kept.
 2. `data` - Contains all files that serve static data in the application.
 3. `pages` - Contains actual pages that compose of components and are used in react router navigation.
 4. `redux` - Contains all the files related to redux, store, slices, reducers, etc.
 5. `utils` - Contains reusable utility functions which are frequently used anywhere and serve a specific purpose.

<br />

## Contributing 📌
**Pushing directly to main branch isn't allowed.** Before contributing, make sure you are creating a new branch and making changes there. The branch name should be in this format:
**`Feature/Bug_fix-Title_of_the_feature_or_bug_fix`**

For example: `Feature-Added_Custom_Nodes`, `Bug_fix-Fixed_Workflow_Node_content_overflow`. These are some valid branching names which would help us understand your contributions better.

Also, add meaningful descriptions in your PRs to get a clear idea about the changes you are making.

**Your Ideas are always welcomed!** 💡