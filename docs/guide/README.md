# Guide

## Requirements

- Windows 7 SP1+ / Windows Server 2008+
- PowerShell 3 (or later) and .NET Framework 4.5+
- PowerShell must be enabled for your user account and `executionpolicy` set to `remotesigned`

Make sure you have PowerShell 3 or later installed. If you're on Windows 10 or Windows Server 2012 you should be all set, but Windows 7 and Windows Server 2008 might have older versions.

Check your PowerShell version with following command:

```powershell
$psversiontable.psversion.major # should be >= 3
```

Make sure you have allowed PowerShell to execute local scripts by typing following command:

```powershell
set-executionpolicy remotesigned -scope currentuser
```

::: tip
`Unrestricted` will work too, but it is less secure. So stick with `RemoteSigned` if you're not sure.
:::

## Installation

### Quick Installation

In a PowerShell command console, run:

```powershell
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

### Custom Directory Installation

Assuming the target directory is `D:\Applications\Scoop`, in a PowerShell command console, run:

```powershell
[environment]::setEnvironmentVariable('SCOOP', 'D:\Applications\Scoop', 'User')
$env:SCOOP='D:\Applications\Scoop' # with this we don't need to close and reopen the console
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

If you didn't see any error messages, Scoop is now ready to run.

If you need to set global installation to custom directory, you need to set `SCOOP_GLOBAL` environment to your preferred location, here is PowerShell command to set the environment:

```powershell
[environment]::setEnvironmentVariable('SCOOP_GLOBAL','F:\GlobalScoopApps','Machine')
$env:SCOOP_GLOBAL='F:\GlobalScoopApps'
```

::: warning
Global installations need an Administrator privilege.
:::

## Using Scoop

Although Scoop is written in PowerShell, it's interface is closer to Git and Mercurial than it is to most PowerShell programs.

To get an overview of Scoop's interface, run:

```powershell
scoop help
```

You'll see a list of commands with a brief summary of what each command does. For more detailed information on a command, run `scoop help <command>`, e.g. `scoop help install` (try it!).

Now that you have a rough idea of how Scoop commands work, let's try installing something.

### Installing Apps

```powershell
scoop install curl
```

You'll probably see a warning about a missing hash, but you should see a final message that cURL was installed successfully. Try running it:

```powershell
curl -L https://get.scoop.sh
```

You should see some HTML, probably with a 'document moved' message. Note that, like when you installed Scoop, you didn't need to restart your console for the program to work. Also, if you've installed cURL manually before you might have noticed that you didn't get an error about SSL—Scoop downloaded a certificate bundle for you.

### Finding Apps

Let's say you want to install the `ssh` command but you're not sure where to find it. Try running:

```powershell
scoop search ssh
```

You'll should see a result for 'openssh'. This is an easy case because the name of the app contains 'ssh'.

You can also find apps by the name of the commands they install. For example,

```powershell
scoop search hg
```

This shows you that the 'mercurial' app includes 'hg.exe'.

### Upgrade Apps

To get the latest version of Scoop apps you have to run the command

```powershell
scoop update
```

This will download the latest version of scoop and updates the local app manifests.

After you updated Scoop you can update individual apps

```powershell
scoop update curl
```

If you want to update all your installed apps, you can run

```powershell
scoop update *
```

## Uninstall Scoop

If you've tried Scoop and it's not for you—no problem. You can uninstall Scoop and all the programs you've installed with Scoop by running:

    scoop uninstall scoop

This will let you know what's going to happen and ask if you're sure—just type 'y' and press enter to confirm.

### Broken Install

If you delete `~/scoop` you should be able to reinstall.
