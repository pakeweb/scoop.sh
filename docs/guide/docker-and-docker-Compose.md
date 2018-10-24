# Docker and Docker Compose

Requirements: [Virtualbox](https://www.virtualbox.org/) or [VmWare](https://www.vmware.com/)

## First time, set-up Docker and create a base machine

Set-up Docker stack:

```powershell
scoop install docker docker-compose docker-machine
```

Create our Docker base machine (will be named _default_):

```powershell
docker-machine create default
```

## Each time starting working with Docker

```powershell
docker-machine start
docker-machine env
```

We copy the command to access directly our Docker machine, something like:

```powershell
& "$HOME\AppData\Local\scoop\apps\docker-machine\0.7.0\docker-machine.exe" env | Invoke-Expression
```

Then we can bring up any Docker image:

```powershell
docker run ubuntu /bin/echo 'Hello world'
```

When finished:

```powershell
docker-machine stop
```

Getting our Docker machine:

```powershell
docker-machine ls
```
