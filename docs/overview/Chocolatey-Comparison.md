#### How is Scoop different to [Chocolatey](http://chocolatey.org)?

- **Installs to ~/scoop/ by default.** You can set up your own programs and not worry that they'll interfere with other users' programs (or theirs with yours, perhaps more importantly). You can optionally choose to install programs system-wide if you have administrator rights.
- **No UAC popups, doesn't require admin rights.** Since programs are installed just for your user account, you won't be interrupted by UAC popups.
- **Doesn't pollute your path.** Where possible, Scoop puts your program shims in a single directory and just adds that to your path.
- **Doesn't use NuGet.** NuGet is a great solution to the problem of managing software library dependencies. Scoop avoids this problem altogether: each program you install is isolated and independent.
- **Simpler than packaging.** Scoop isn't a package manager, rather it reads plain JSON manifests that describe how to install a program and its dependencies.
- **Simpler app repository.** Scoop just uses Git for its app repository. You can create your own repo, or even just a single file that describes an app to install.
- **Can't always install a specific version of a program.** For some programs, scoop can install an older version of a program, via `scoop install app@version`. For example, `scoop install curl@7.56.1`. This functionality only works if the old version is still available online. Some older versions have specific installers, such as Python 2.7 and Ruby 1.9, which are commonly required. These can be installed from the [versions](https://github.com/scoopinstaller/versions/) bucket via `scoop install python27` and `scoop install ruby19`.
- **Focuses on developer tools.** While it would be easy to install Skype with Scoop, this will probably never be in Scoop's main bucket (app repository). Scoop focuses on open-source, command-line developer tools.

## How is Scoop different to Cygwin and MSYS?

The most concise comparison I've come across for these 2 projects is an answer by Mike Zick in [this thread](http://sourceforge.net/mailarchive/forum.php?thread_name=200506130821.11185.mszick%40morethan.org&forum_name=mingw-msys).

> Cygwin is an operating system wrapper<br>
> The goal of Cygwin is to provide a Linux Programming API.
>
> Msys is a command shell substitute<br>
> The goal of Msys is to provide a POSIX scripting environment.

It's probably not a completely accurate or comprehensive comparison, but it is fairly easy to grasp.

So to parallel this for Scoop:

**Scoop is an installer**<br>
**The goal of Scoop is to let you use Unix-y programs in a normal Windows environment**

Using Scoop lets you achieve similar things to Cygwin and MSYS, but without having to learn about and use a separate environment. You can just keep doing what you're already doing but easily access the cross-platform tools you need.

As it happens, a lot of the programs that Scoop installs either come directly from the MinGW/MSYS project, or were built using their tools. Scoop can only hope to achieve its goals because of 15 years of amazing work on MinGW/MSYS, which itself is based on Cygwin.
