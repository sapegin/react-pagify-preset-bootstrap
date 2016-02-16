# Bootstrap preset for react-pagify

This preset allows you to integrate [react-pagify](https://github.com/bebraw/react-pagify) with [Bootstrap 3](http://getbootstrap.com/).

See [how it looks](http://sapegin.github.io/react-pagify-preset-bootstrap/).

## Installation

```bash
npm install --save react-pagify react-pagify-preset-bootstrap
```

## Usage

```javascript
import Paginator from 'react-pagify';
import pagifyBootstrapPreset from 'react-pagify-preset-bootstrap';

...

<Paginator.Context
  {...pagifyBootstrapPreset}
  segments={{
    ...
  }}
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

See [react-pagify documentation](https://github.com/bebraw/react-pagify/blob/master/README.md) for all available options.

## Changelog

The changelog can be found on the [Releases page](https://github.com/sapegin/react-pagify-preset-bootstrap/releases).

## Author

* [Artem Sapegin](http://sapegin.me/)

Demo page is based on the original `react-pagify` demo.

# License

The MIT License, see the included [License.md](https://github.com/sapegin/react-pagify-preset-bootstrap/blob/master/License.md) file.
