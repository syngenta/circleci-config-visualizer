# CircleCI Config Visualizer

The `circleci-config-visualizer` is a package/tool that can be used to visualize circlei `config.yml` files. It provides a clear overview of CI workflows and jobs in the config files.

A `cli` utility is also provided to help users visualize config files directly using command line by specifying the config file.

Built using `reactjs`, `redux`, `nodejs` and `Typescript`.

## How to use
### Using CLI (For usage):
1. Make sure you have `nodejs` and `npm` installed. Install the package using `npm`:

    ```
    npm install -g circleci-config-visualizer
    ```

<br />

2. Open terminal or command line and enter the following command to start the server and client:

    ```
    circleci-config-visualizer -f <path_to_your_config_file>
    # eg - circleci-config-visualizer -f ./config.yml
    ```

<br />

3. The specified file gets opened in the browser at `localhost:3000` for visualization:

    ![Visualized file](https://github.com/syngenta/circleci-config-visualizer/blob/main/images/visualized_file.png)

<br />
<br />

### Using React (For development):
1. Clone the repo:

    ```
    git clone https://github.com/syngenta/circleci-config-visualizer.git
    ```

<br />

2. Navigate to `client` directory and run `npm start` in the terminal:

    ```
    cd client
    npm start
    ```

<br />

3. The webapp gets opened in the browser at `localhost:3000`. Click on **Upload** button and choose your config file to visualize:

    ![Homepage](https://github.com/syngenta/circleci-config-visualizer/blob/main/images/homepage.png)
