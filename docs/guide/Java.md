### Choice of JDKs

Java development kits (JDK) and runtime environments (JRE) are available through the [Scoop Java bucket](https://github.com/se35710/scoop-java).

To add the bucket, run `scoop bucket add java` 

[OpenJDK](https://github.com/se35710/scoop-java/blob/master/openjdk.json) is the preferred JDK (because of its Open Source [license](http://openjdk.java.net/legal/gplv2+ce.html)), and can be installed with `scoop install openjdk`. The Scoop Java bucket contains four different OpenJDK builds: [OpenJDK](http://openjdk.java.net), [Zulu](https://www.azul.com/products/zulu-and-zulu-enterprise), [ojdkbuild](https://github.com/ojdkbuild/ojdkbuild) and [AdoptOpenJDK](https://adoptopenjdk.net). The latter with both Hotspot and OpenJ9 JVMs.

Oracle’s Java is also available, in two versions: [JDK](https://github.com/se35710/scoop-java/blob/master/oraclejdk.json), [JDK-LTS](https://github.com/se35710/scoop-java/blob/master/oraclejdk-lts.json). The JDK-LTS version follows Oracle's new LTS releases (available since version 11).

### Switching Javas

There are two solutions available today for switching java:

1. `scoop reset <java>[@<version>]`
2. Using [find-java](https://github.com/lukesampson/scoop-extras/blob/master/find-java.json) from [extras](https://github.com/lukesampson/scoop-extras)

`scoop reset` works very well for the current session, and will also update the user's path.

Globally installed javas takes precedence over user installed javas, so running `sudo scoop install -g oraclejdk-lts` will install a java that is always default for new sessions.

Consider the following:
```
PS C:> scoop install oraclejdk-lts
Installing 'oraclejdk-lts' (8u172-b11) [64bit]
PS C:> scoop install oraclejdk10
Installing 'oraclejdk10' (10.0.1-10) [64bit]
PS C:> scoop install zulu6
Installing 'zulu6' (6.18.1.5) [64bit]
PS C:> scoop install openjdk10
Installing 'openjdk10' (10.0.1) [64bit]
PS C:> java -version
openjdk version "10.0.1" 2018-04-17
OpenJDK Runtime Environment (build 10.0.1+10)
OpenJDK 64-Bit Server VM (build 10.0.1+10, mixed mode)
PS C:> scoop reset zulu6
Resetting zulu6 (6.18.1.5).
Linking ~\scoop\apps\zulu6\current => ~\scoop\apps\zulu6\6.18.1.5
PS C:> java -version
openjdk version "1.6.0-99"
OpenJDK Runtime Environment (Zulu 6.18.1.5-win64) (build 1.6.0-99-b99)
OpenJDK 64-Bit Server VM (Zulu 6.18.1.5-win64) (build 23.77-b99, mixed mode)
PS C:> scoop reset oraclejdk-lts
PS C:> java -version
java version "1.8.0_172"
Java(TM) SE Runtime Environment (build 1.8.0_172-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.172-b11, mixed mode)
```
