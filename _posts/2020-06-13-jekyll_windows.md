---
title: Windows 端安装jekyll
tags: blog github windows jekyll
categories: code
---
github中的page功能支持将代码库中的文件以静态网站的形式展示。支持jekyll框架下的网站转换。jekyll有很多网站模板，[点击进入jekyll主题网站](http://jekyllthemes.org/)，选好主题模板后，只需要修改post里的文章即可在主页上看到文章了。post里的文件支持html格式，也支持makrdonwn格式。本篇是用makrdown写的。
在写完文章后，文章里多少可能会有问题，防止上传到github后出错，反复调试麻烦，可以在本地搭一个jekyll服务器调试好再上传。本文主要说明怎么在windows端搭建jekyll服务器。

# 1.下载ruby
jekyll是用[ruby](http://www.ruby-lang.org/)写的，所以第一步需要先安装ruby。安装可以选学源码安装，也可以用相应平台的安装包安装，windows端还是用安装包安装方便，目前有专门的windows平台的[安装包网站](https://rubyinstaller.org/downloads/)。打开链接后，选网站推荐的版本下载，推荐的版本下载连接会加粗，如现在的推荐版本是**[Ruby+Devkit 2.6.6-1 (x64)](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.6.6-1/rubyinstaller-devkit-2.6.6-1-x64.exe)** 。
推荐的版本中包含有devkit，有的功能是需要有相应编译功能的，所以最好安装devkit版本。

安装完成时不要选安装MSYS2 toolchain ，因为他们的默认源比较慢，需要手动改一下源，再执行ridk install安装即可。
修改源的位置在\Ruby26-x64\msys64\etc\pacman.d\中的 mirrorlist.mingw32 mirrorlist.mingw64 mirrorlist.msys文件中，装文件中的内容改成下面的样子即可。

## mirrorlist.msys
``` 
##
## MSYS2 repository mirrorlist
##

## Primary
## msys2.org
Server = http://mirrors.ustc.edu.cn/msys2/msys/$arch/
Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/$arch/
Server = http://mirrors.ustc.edu.cn/msys2/msys/$arch/
Server = http://mirror.bit.edu.cn/msys2/msys/$arch/
Server = http://mirror.bit.edu.cn/msys2/msys/$arch/
Server = http://repo.msys2.org/msys/$arch/
Server = https://sourceforge.net/projects/msys2/files/REPOS/MSYS2/$arch/
Server = https://www2.futureware.at/~nickoe/msys2-mirror/msys/$arch/
Server = https://mirror.yandex.ru/mirrors/msys2/msys/$arch/
``` 
## mirrorlist.mingw64
``` 
##
## 32-bit Mingw-w64 repository mirrorlist
##

## Primary
## msys2.org
Server = http://mirrors.ustc.edu.cn/msys2/mingw/i686/
Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/i686/
Server = http://mirrors.ustc.edu.cn/msys2/mingw/i686/
Server = http://mirror.bit.edu.cn/msys2/mingw/i686/
Server = http://repo.msys2.org/mingw/i686/
Server = https://sourceforge.net/projects/msys2/files/REPOS/MINGW/i686/
Server = https://www2.futureware.at/~nickoe/msys2-mirror/mingw/i686/
Server = https://mirror.yandex.ru/mirrors/msys2/mingw/i686/
``` 
## mirrorlist.mingw32
``` 
##
## 64-bit Mingw-w64 repository mirrorlist
##

## Primary
## msys2.org
Server = http://mirrors.ustc.edu.cn/msys2/mingw/x86_64/
Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/x86_64/
Server = http://mirrors.ustc.edu.cn/msys2/mingw/x86_64/
Server = http://mirror.bit.edu.cn/msys2/mingw/x86_64/
Server = http://repo.msys2.org/mingw/x86_64/
Server = https://sourceforge.net/projects/msys2/files/REPOS/MINGW/x86_64/
Server = https://www2.futureware.at/~nickoe/msys2-mirror/mingw/x86_64/
Server = https://mirror.yandex.ru/mirrors/msys2/mingw/x86_64/
``` 

修改源后，执行ridk install 后很快就能安装好了。
# 2.安装jekyll
安装好ruby后，控制台（cmd）运行gem install jekyll即可安装成功能jekyll。
# 3.运行jekyll
在控制台中进入blog模板所在位置，比如e:\blog，运行jekyll server，如果运行正确就会提示成
![](/static/img/1.jpg)
# 4.修正依赖
如果执行jekyll server的时候出现依赖错误，按照提示安装相关依赖即可，如下面说明缺jekyll-paginate，执行gem install jekyll-paginate即可。
```
$ jekyll serve
Configuration file: /var/www/lanyon-mobile/_config.yml
Deprecation: You appear to have pagination turned on, but you haven’t included the jekyll-paginate gem. Ensure you have plugins: [jekyll-paginate] in your configuration file.
Source: /var/www/lanyon-mobile
Destination: /var/www/lanyon-mobile/_site
Incremental build: disabled. Enable with --incremental
Generating…
Since v3.0, permalinks for pages in subfolders must be relative to the site source directory, not the parent directory. Check https://jekyllrb.com/docs/upgrading/ for more info.
```