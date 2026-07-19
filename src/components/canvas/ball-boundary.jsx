'use client';

import * as React from 'react';

/**
 * Isolates a single skill ball. `useTexture` suspends on load and *throws* on a
 * missing or corrupt icon — without this, one bad file would unmount the whole
 * Canvas and blank the entire Skills section. Here a failure costs one sphere,
 * which degrades to a static gradient tile.
 */
export class BallBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[skill ball] "${this.props.name}" failed to render:`, error);
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}
