import { render, screen } from '@testing-library/react';

import ListComponent, { GapSizeEnum } from '../src/components/common/ListComponent';

const gapSizeSmall = 'gap-4';
const gapSizeMedium = 'gap-8';
const gapSizeBig = 'gap-12';

describe('Tests ListComponent', function () {
  it('verifies list component renders empty list.', function () {
    render(<ListComponent />);

    const listElement = screen.getByTestId('list-element');

    expect(listElement).toBeTruthy;
    expect(listElement.childElementCount).toEqual(0);
  });

  it('verifies list component renders list with one child element.', function () {
    render(
      <ListComponent>
        {' '}
        <li> Testing, testing </li>{' '}
      </ListComponent>,
    );

    const listElement = screen.getByTestId('list-element');

    expect(listElement).toBeTruthy;
    expect(listElement.childElementCount).toEqual(1);
  });

  it('verifies list component renders list with two child elements with default grid gap.', function () {
    render(
      <ListComponent>
        {' '}
        <li> Testing, testing </li>
        <li> Testing, testing </li>{' '}
      </ListComponent>,
    );

    const listElement = screen.getByTestId('list-element');

    expect(listElement).toBeTruthy;
    expect(listElement.childElementCount).toEqual(2);
    expect(listElement.classList.contains(gapSizeMedium)).toBe(true);
    expect(listElement.classList.contains(gapSizeSmall)).toBe(false);
    expect(listElement.classList.contains(gapSizeBig)).toBe(false);
  });

  it('verifies list component renders list with two child elements with small grid gap.', function () {
    render(
      <ListComponent gapSize={GapSizeEnum.SMALL}>
        {' '}
        <li> Testing, testing </li>
        <li> Testing, testing </li>{' '}
      </ListComponent>,
    );

    const listElement = screen.getByTestId('list-element');

    expect(listElement).toBeTruthy;
    expect(listElement.classList.contains(gapSizeMedium)).toBe(false);
    expect(listElement.classList.contains(gapSizeBig)).toBe(false);
    expect(listElement.classList.contains(gapSizeSmall)).toBe(true);
  });

  it('verifies list component renders list with two child elements with big grid gap.', function () {
    render(
      <ListComponent gapSize={GapSizeEnum.BIG}>
        {' '}
        <li> Testing, testing </li>
        <li> Testing, testing </li>{' '}
      </ListComponent>,
    );

    const listElement = screen.getByTestId('list-element');

    expect(listElement).toBeTruthy;
    expect(listElement.classList.contains(gapSizeMedium)).toBe(false);
    expect(listElement.classList.contains(gapSizeSmall)).toBe(false);
    expect(listElement.classList.contains(gapSizeBig)).toBe(true);
  });
});
