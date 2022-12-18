import { screen } from '@testing-library/react';

import { renderWithProviders } from '../utils/test-utils';

import ProgressComponent from '@/components/Specific/ProgressComponent';

describe('Tests Progress Component', function () {
  it('verifies progress component is rendered with correct style percentage', function () {
    renderWithProviders(<ProgressComponent status={50} />);

    const progressBarElement = screen.getByTestId('progress-bar-element');

    expect(progressBarElement).toBeTruthy;
    expect(progressBarElement.style.width).toEqual('50%');
  });
});
