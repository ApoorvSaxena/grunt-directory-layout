# grunt-directory-layout [![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](http://gruntjs.com/)

> Grunt plugin to verify/generate directory layout

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-directory-layout --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-directory-layout');
```

## The "directory_layout" task

### Overview
In your project's Gruntfile, add a section named `directory_layout` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  directory_layout: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file/folder and/or options go here.
    },
  },
});
```

### Options

#### options.action
Type: `String`
Default value: `"verify"`
Possible values: `"verify"` or `"generate"`

`"verify"` verifies an existing directory layout against the specified directory and `"generate"` generates a directory layout for a directory.

#### options.ignore
Type: `Array`
Default value: `[]`

Files/Folders to ignore while generating the layout.

### Usage Examples

#### Default Options for verifying the layout
In this example, the default options are used to verify the layout of a directory.

```js
grunt.initConfig({
  directory_layout: {
    options: {
      action: 'verify'
    },
    files: {
      // here "test/" directory layout has to be verified
      // "test/expected/default_options" is the file that stores the layout
      'test/': 'test/expected/default_options'
    }
  },
});
```

#### Default Options for generating the layout
In this example, the default options are used to generate the layout of a directory.

```js
grunt.initConfig({
  directory_layout: {
    options: {
      action: 'generate'
    },
    files: {
      // "tmp/default_options" is the file that stores the layout
      //  and "test/" directory layout has to be generated
      'tmp/default_options': 'test/'
    }
  },
});
```

#### Custom Options
In this example, custom options are passed to generate the layout of a directory.

```js
grunt.initConfig({
  directory_layout: {
    options: {
      action: 'generate',
      ignore: [
        // ignore file named 123
        '123'
      ]
    },
    files: {
      // "tmp/custom_options" is the file that stores the layout
      //  and "test/" directory layout has to be generated
      'tmp/custom_options': 'test/'
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).