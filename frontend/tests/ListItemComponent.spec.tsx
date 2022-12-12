import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import ListItemComponent from '../src/components/common/ListItemComponent';

describe('Tests ListItemComponent', function () {
  it('verifies list item component renders with text.', function () {
    render(<ListItemComponent>List Item!</ListItemComponent>);

    const listElement = screen.getByTestId('list-item-element');

    expect(listElement).toBeTruthy;
    expect(listElement.childElementCount).toEqual(0);
    expect(listElement.textContent).toEqual('List Item!');
    expect(listElement.nodeName).toEqual('LI');
  });

  it('verifies list item component renders with text as link.', function () {
    render(
      <MemoryRouter>
        <ListItemComponent linkUrl="/test">List Item as a link!</ListItemComponent>
      </MemoryRouter>,
    );

    const listElement = screen.getByTestId('list-item-element');

    expect(listElement).toBeTruthy;
    expect(listElement.childElementCount).toEqual(0);
    expect(listElement.textContent).toEqual('List Item as a link!');
    expect(listElement.nodeName).toEqual('A');
  });
});
