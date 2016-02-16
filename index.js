var React = require('react');

module.exports = {
  className: 'pagination',
  tags: {
      container: {
          tag: 'ul'
      },
      segment: {
          tag: 'li'
      },
      ellipsis: {
          tag: 'li',
          props: {
              className: 'disabled',
              children: React.createElement('span', null, '…')
          }
      },
      link: {
          tag: 'a',
          props: {
              href: '#'
          }
      }
  }
};
