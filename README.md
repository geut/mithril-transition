# mithril-transition
A lightweight library for MithrilJS to create your own custom transitions based on the lifecycle of your components.

## Install

With [npm](https://npmjs.com/package/mithril-transition) and [browserify](https://www.npmjs.com/package/browserify)/[webpack](https://www.npmjs.com/package/webpack) do:

```
npm install --save mithril-transition
```

Or you can use the UMD bundle

```html
<script src="/lib/mithril-transition/dist/mithril-transition.umd.js" type="text/javascript"></script>
```

## How to use it

**mithril-transition** is a function factory that return a ```config``` function for your v-node (where you want animate it) of mithril. The best way is take a look of the [live example](https://t.co/1psrMMUqkT)

## Options

#### anim (required)
Callback function where you define the animation for the next/prev component.

The callback has the next parameters:

**lastElem**: The last DOM element that is removing.

**newElem**: The new DOM element that is inserting.

**direction**: This option allow to you define differents animations based of next/prev direction of the lifecycle components. Is required has at least ```useHistory``` in true.

**cbLast**: Callback to complete the remove of the lastElem. (is required call it)

**cbNew**: Callback to complete the insert of the newElem. (is required call it)

#### useHistory (default = true)
When is enabled the library keep the history of your components, to know if the next element in the transition is really the next element or a prev element.

#### persistHistoryAs ({string} default = undefined)
Save the history in the sessionStorage identified by a key.

#### styleParent
Before that the transition begin, the library set a style in the parent element and remove it when the transition is finished. You can customize this styles of even disable setting in false the option.
```javascript
default = {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
}
```

#### styleLastElement
Before that the transition begin, the library set a style in the **new** element and remove it when the transition is finished. You can customize this styles of even disable setting in false the option.
```javascript
default = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
}
```

#### styleNewElement
Before that the transition begin, the library set a style in the **new** element and remove it when the transition is finished. You can customize this styles of even disable setting in false the option.
```javascript
default = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
}
```

## On roadmap

nothing for now :)

## Credits

* Thanks to @dpaez to work with me the last year in a mobile project using [Mithril](http://mithril.js.org/) and exploring how to make transitions and animations with this excellent "MVC" framework.

## License

MIT
