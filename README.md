# grunt-contrib-mtc

> Media to class 的首字母缩写。功能：从指定文件中抽取@media块, 生成带有尺寸前缀的新样式文件。 适用于低版本IE下响应式css的生成。

## Getting Started
本插件基于grunt `~0.4.1` 开发。

如果你之前没有使用过 [Grunt](http://gruntjs.com/) , 打开 [开始使用](http://gruntjs.com/getting-started) , 查看如何创建一个 [Gruntfile](http://gruntjs.com/sample-gruntfile) 以及安装和使用Grunt插件。 你可以通过以下命令安装该插件:

```shell
npm install grunt-contrib-mtc --save-dev
```

如果插件已经安装完成，你便可以在Gruntfile中使用下面这句 JavaScript 启用插件:

```js
grunt.loadNpmTasks('grunt-contrib-mtc');
```

## "mtc" 任务

### 概述
在项目的 Gruntfile 的 `grunt.initConfig()` 中, 添加名为 `mtc` 的配置对象。

```js
grunt.initConfig({
  mtc: {
    options: {
      // Task-specific options go here.
    },
    files: {
      // Target-specific file lists and/or options go here.
    }
  }
})
```

### 选项

#### options.separator
类型: `String`
默认值: `',  '`

该版本中暂时未使用

#### options.punctuation
类型: `String`
默认值: `''`

用于拼接多文件间生成样式的字符串，默认为空，可为`\n`、`/* create from filename */`等。

#### options.prefix
类型: `String`
默认值: `'w'`

定义生成样式前缀（例：`prefix: "mw"`，将得到类似 `.mw1024` 的前缀）。

### 使用案例
转换效果大致如下：

![grunt-contrib-mtc](http://www.seejs.com/wp-content/uploads/2013/07/mtc.png)

#### 默认配置
从 src 目录下的 test.css 文件中抽取 @media 块，在 build 文件夹中生成与项目同名并追加 `-ie` 后缀的 css 文件。

```js
grunt.initConfig({
  mtc: {
    pkg: grunt.file.readJSON('package.json'),
    options: {},
    files: {
      'build/<%= pkg.name %>-ie.css': ['src/test.css']
    }
  }
})
```

#### 自定义配置
内容与默认配置大致相同，增加 `options` 配置：

```js
grunt.initConfig({
  mtc: {
    options: {
      separator: ': ',
      punctuation: '/*以下为新文件*/'，
      prefix: "mw"
    },
    files: {
      'build/<%= pkg.name %>-ie.css': ['src/test.css']
    }
  }
})
```

#### 执行任务
首先注册任务，使用以下命令：

```js
grunt.registerTask('default', ['mtc']);
```

然后执行任务，使用以下命令：

```js
grunt default
```

## 发布历史
* 2013/07/25      v0.1.0      第一版发布。 
* 2013/07/25      v0.1.1      更新文档。
* 2013/07/26      v0.1.2      新增配置参数 prefix ，优化正则表达式。
