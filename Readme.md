# Bootstrap preset for react-pagify

This preset allows you to integrate [react-pagify](https://github.com/bebraw/react-pagify) with [Bootstrap 3](http://getbootstrap.com/).

[![](http://wow.sapegin.me/2W0b2J2g0b2C/react-pagify.png)](http://sapegin.github.io/react-pagify-preset-bootstrap/)

[Play with it](http://sapegin.github.io/react-pagify-preset-bootstrap/) on the demo page.

## Installation

```bash
npm install --save react-pagify react-pagify-preset-bootstrap
```

## Usage

```javascript
import Paginator from 'react-pagify';
import pagifyBootstrapPreset from 'react-pagify-preset-bootstrap';
import segmentize from 'segmentize';

...

<Paginator.Context
  {...pagifyBootstrapPreset}
  segments={segmentize({
      pages,
      page,
      beginPages: 1,
      endPages: 1,
      sidePages: 3
  })}
  onSelect={(newPage, event) => {
      event.preventDefault();
      onPageChange(newPage);
  }}
>
  <Paginator.Button page={page - 1}>Previous</Paginator.Button>
  <Paginator.Segment field="beginPages" />
  <Paginator.Ellipsis previousField="beginPages" nextField="previousPages" />
  <Paginator.Segment field="previousPages" />
  <Paginator.Segment field="centerPage" className="active" />
  <Paginator.Segment field="nextPages" />
  <Paginator.Ellipsis previousField="nextPages" nextField="endPages" />
  <Paginator.Segment field="endPages" />
  <Paginator.Button page={page + 1}>Next</Paginator.Button>
</Paginator.Context>
```

Note that you need to use `active` class for the `centerPage` segment.

Also note that you can use any library for pagination logic, [segmentize](https://www.npmjs.com/package/segmentize) is recommended but not required.

See [react-pagify documentation](https://github.com/bebraw/react-pagify/blob/master/README.md) for all available options.

## Changelog

The changelog can be found on the [Releases page](https://github.com/sapegin/react-pagify-preset-bootstrap/releases).

## Author

* [Artem Sapegin](http://sapegin.me/)

Demo page is based on the original `react-pagify` demo.

# License

The MIT License, see the included [License.md](https://github.com/sapegin/react-pagify-preset-bootstrap/blob/master/License.md) file.
