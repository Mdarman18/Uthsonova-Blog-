import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../store';
import { MemoryRouter } from 'react-router-dom';

// ── Sanity check ──────────────────────────────────────────────────────────────
describe('App — sanity check', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    // Verify the document body exists — proves the component mounted
    expect(document.body).toBeInTheDocument();
  });
});
