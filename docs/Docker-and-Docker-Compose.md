Requirements: [Virtualbox](https://www.virtualbox.org/) or [VmWare](https://www.vmware.com/)

## First time, set-up Docker and create a base machine

Set-up Docker stack:

    scoop install docker docker-compose docker-machine

Create our Docker base machine (will be named _default_):

    docker-machine create default

## Each time starting working with Docker

    docker-machine start

    docker-machine env

We copy the command to access directly our Docker machine, something like:

    & "$HOME\AppData\Local\scoop\apps\docker-machine\0.7.0\docker-machine.exe" env | Invoke-Expression

Then we can bring up any Docker image:

    docker run ubuntu /bin/echo 'Hello world'

When finished:

    docker-machine stop

Getting our Docker machine:
    
    docker-machine ls