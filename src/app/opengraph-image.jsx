import { ImageResponse } from 'next/og';
import { PROFILE } from '@/lib/constants';

// Node runtime of @vercel/og fails on Windows paths containing spaces; edge build doesn't.
export const runtime = 'edge';

export const alt = `${PROFILE.name} — ${PROFILE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0F0F14',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(255,107,157,0.25) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(196,69,105,0.2) 0%, transparent 50%)',
          color: '#F8FAFC',
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#FF8FA3',
          }}
        >
          {PROFILE.tagline}
        </div>
        <div style={{ fontSize: 104, fontWeight: 700, marginTop: 16 }}>{PROFILE.name}</div>
        <div style={{ fontSize: 34, color: '#9CA3AF', marginTop: 12 }}>
          Mumbai, India
        </div>
        <div style={{ display: 'flex', gap: 48, marginTop: 56, fontSize: 30 }}>
          <div style={{ display: 'flex', color: '#FF6B9D' }}>5+ yrs</div>
          <div style={{ display: 'flex', color: '#FF6B9D' }}>100+ leads/mo</div>
          <div style={{ display: 'flex', color: '#FF6B9D' }}>~25% CPL reduction</div>
        </div>
      </div>
    ),
    size
  );
}
