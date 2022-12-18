import { render, screen } from '@testing-library/react';

import ModalComponent from '@/components/common/ModalComponent';

describe('Tests Modal Component', function () {
  beforeAll(() => {});

  it('verifies modal backdrop renders an empty element.', function () {
    render(<ModalComponent />);

    const modalBackDropElement = screen.getByTestId('modal-backdrop-element');

    expect(modalBackDropElement).toBeTruthy;
    expect(modalBackDropElement.childElementCount).toEqual(0);
  });

  it('verifies modal component content renders as an empty element.', function () {
    render(<ModalComponent />);

    const modalBackDropElement = screen.getByTestId('modal-content-element');

    expect(modalBackDropElement).toBeTruthy;
    expect(modalBackDropElement.childElementCount).toEqual(0);
  });

  it('verifies modal component content renders with element inside.', function () {
    render(<ModalComponent><div>Element inside!</div></ModalComponent>);

    const modalBackDropElement = screen.getByTestId('modal-content-element');

    expect(modalBackDropElement).toBeTruthy;
    expect(modalBackDropElement.childElementCount).toEqual(1);
  });
});
