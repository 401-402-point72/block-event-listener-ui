I added a python environment for this so that we can avoid any dependency issues across different machines.
The environment will need to be activated for development to ensure that the correct dependencies are used.
You can probably get away with not having the environment active if you didn't run into conflicts when downloading 
the packages `boto3` and `nicegui` but I did. 

To start the environment you will need to have `venv` installed through python.

`sudo apt install python3.10-venv`

To start the environment do `source block-event-listener-ui/bin/activate` and `deactivate` to stop it.
This environment should already have `boto3` and `nicegui` installed and should act the same way a `node_modules` folder does.
