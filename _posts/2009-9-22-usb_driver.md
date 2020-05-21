---
title: Windows&nbsp;USB功能驱动开发总结
tags: USB C语言 设备 硬件
categories: driver
---
		
【文章标题】:&nbsp;Windows&nbsp;USB功能驱动开发总结<br>
【文章作者】:&nbsp;yybing<br>
【作者声明】:&nbsp;只是感兴趣，没有其他目的。失误之处敬请诸位大侠赐教!<br>
--------------------------------------------------------------------------------<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;最近做了一个USB设备的功能驱动，并对其速度的瓶颈做了一些分析，最后找到了影响此设备的速度的主要原因。由于USB设备的通用性，代码的主体直接使用DDK提供的示例代码：Bluckusb。从正确编译到能正常读写数据有几个关键点，总结了一下，特与大家分享，有不足之处请不吝赐教。<br>
<br>

* TOC
{:toc}
1、&nbsp;USB驱动结构图<br>
&nbsp;<img src="/static/img/232724_td31x5u8rgbl7eu.jpg" width="558" height="451" style="cursor: pointer;" class="div_message_boxShadow">&nbsp;<br>
图表&nbsp;1：USB设备层次结构<br>
&nbsp;&nbsp;&nbsp;&nbsp;USB主控制器与其它I/O设备一样直接连接到系统总线上。操作系统与主控制器通信使用I/O口或内存寄存器，通过普通的中断信号，系统可以接受主控制器的事件通知。主控制器连接一棵USB设备树。一种称为hub的设备作为其它设备的连接点。多个hub能以菊链方式连接，可以连接到USB规范中定义的最大深度。其它设备，如照相机、麦克风、键盘等等，直接连到hub上。为了精确地表达概念，USB使用术语function来描述非hub设备。<br>
<br>
2、&nbsp;写USB功能驱动需要了解的内容<br>
a.&nbsp;&nbsp;驱动编译方法<br>
各种入门书上都有介绍，用DDK的Dos环境编译时，错误信息会在Dos界面显示，如果这些信息不能定位问题，可以到代码目录下找名字为buildxx的log文件。<br>
b.&nbsp;&nbsp;驱动与设备的关联<br>
驱动与设备的关联是靠INF文件来指定的。简单来说只要把DDK中提供的USB驱动示例中的INF文件中的VID_XXXX和PID_XXXX中的XXXX换成自己设备的VID和PID值，[SourceDisksFiles]节中BULKUSB.sys&nbsp;换成自己的驱动文件名称就可以使驱动和设备关联。更多INF文件介绍可以参考相关介绍文档。<br>
c.&nbsp;&nbsp;设备自定义的命令<br>
自定义的设备，一般都会自定义一些控制命令，在写驱动时，需要了解这些命令的作用，在调试时方便定位问题所在。<br>
此处需要把IoControl命令和设备命令区分开，IoControl命令是应用程序与驱动进行交互的命令，IoControl命令的生成与设备没有直接关系，可以随意设置只要不与驱动的标准命令发生冲突就可以；设备命令是在令牌阶段使用，也即Setup包，设备命令由硬件设计者要定义，设备命令是主机和设备通信的第一步。<br>
<img src="/static/img/232724_gubuv23285fgc1m.jpg" width="558" height="374" style="cursor: pointer;" class="div_message_boxShadow"><br>
图表&nbsp;2：SETUP令牌的内容<br>
<ul>d.&nbsp;&nbsp;USB驱动与设备交互的方式<br>
Windows中通过发送URB和USB设备进行通信备，各种函数代码中的核心是构造URB，发送URB，Setup包（令牌包）中的信息也被包含在URB中。为了方便构造URB，DDK提供了一组宏函数，使用宏函数可以很方便构造不同类型的URB，构造Setup包的宏为UsbBuildVendorRequest&nbsp;，其中index，value，request在硬件中会用到。</ul><br>
<br>
3、&nbsp;正确读写数据的关键点<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;USB设备读写主要由是通过端点来进行，一个端点的数据流方向只能有一个IN或者OUT。端点存在于接口中，接口由配置时取得，配置主要在IRP_MJ_CREATE的Dispatch函数里执行。配置、接口与端点的关系如下图所示。在DDK提供的Bulkusb的代码中，PipeInfomation设置有问题，用fileObject保存pipe&nbsp;handle没有道理，需要改成用deviceExtension来保存；UsbInterfaces中，Pipes数组至少有两个元素，一个是写数据时用的Handle，一个是读数据时用的Handle，在我的设备中Pipes[0]写，Pipes[1]写。<br>
&nbsp;<img src="/static/img/232724_9fzp6ovz7232050.jpg" width="485" height="456" style="cursor: pointer;" class="div_message_boxShadow"><br>
图表&nbsp;3：USB设备的配置、接口、端点<br>
<br>
4、&nbsp;调试驱动的工具<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;查看打印信息，需要用DbgView；要跟踪驱动代码用Windbg，串口线进行双机调试，调试前需要下载被调试机的符号文件；测试并且查看USB读写数据，用Bus&nbsp;Hound，USBlyzer配合使用；驱动代码编辑用Source&nbsp;Insight；代码编译直接用DDK提供的编译环境即可。<br>
<br>