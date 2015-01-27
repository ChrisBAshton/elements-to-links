# Elements to Links

JavaScript library that scans the page for header tags and converts them to links on the fly, so that people can link to relevant content on your long page more easily. Works a bit like GitHub's markdown headers being automatically linked.

Need to share something more specific than just a section of a page? Check out one of my other projects: [http://reff.it](reff.it).

## So what does it do?

Say you have a page like this:

```html
<h2>My Heading</h2>
<p>Some text</p>
```

By default, this library will make the header linkable, like so:

`yoursite.com/your-page.html#MyHeading`

## How to use

elements-to-links supports CommonJS, AMD, RequireJS, etc, but defaults to the global scope if these don't exist in your project. The most simple use case is to just include the script in your page, i.e.

`<script src="/js/lib/elements-to-links.js"></script>`

Then call it like so:

```javascript
ElementsToLinks.convert();
```

You can pass options to the library:

```javascript
ElementsToLinks.convert({
    selector: 'h3'
});
```

Which options can you pass? Read on...

### Options

#### selector

Pass a comma-separated selector for the elements you wish to convert to links, e.g. 'h1, h2, table, ul, .my-class'

## Contribute

I will happily accept pull requests/bug fixes! Some ideas:

* disclude selectors from being made linkable, e.g. {doNotLink: ['h3.subtitle']}
* add tests

## Version 0.1.0
