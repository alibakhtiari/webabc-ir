import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'status-page',
  name: 'Website Maintenance & Uptime Shield',
  category: 'live-data',
  note: '99.99% uptime monitoring, automated cloud backups, and proactive security care plans.',
  tags: ['maintenance', 'security', 'uptime', 'care'],
  cols: 66,
  rows: 17,
  fps: 24,
  size: '3.0 KB',
  palette: palette([
    '#e6edf3',
    '#8b949e',
    '#7ee787',
    '#79c0ff',
    '#ffa657',
    '#ff7b72',
    '#d2a8ff',
    '#484f58',
    '#30363d',
    '#2ea043',
  ]),
};

export default function create() {
  const g = new Grid(meta.cols, meta.rows);

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      66,
      17,
      'round',
      '8',
      ' /STATUS-MONITOR · 24/7 Security & Uptime ',
      '0',
      ' ● 99.99% UP ',
      '2'
    );

    // Keep all labels <= 25 chars so they end by col 28 (3 cols before bars at col 31)
    const services = [
      { name: 'Edge SSL / WAF Firewall', uptime: '100.0%' },
      { name: 'Automated Cloud Backups', uptime: '99.99%' },
      { name: 'Core & Security Patches', uptime: '100.0%' },
      { name: 'DB Query & Cache Tuning', uptime: '99.98%' },
    ];

    const pulseIdx = Math.floor(t * 8) % 23;

    for (let i = 0; i < services.length; i++) {
      const row = 3 + i * 2;
      const s = services[i];
      g.text(3, row, `✓ ${s.name}`, '0');
      for (let b = 0; b < 23; b++) {
        const isPulse = b === pulseIdx;
        g.set(31 + b, row, isPulse ? '█' : '▊', isPulse ? '3' : '2');
      }
      g.text(56, row, s.uptime, '2');
    }

    g.hline(2, 12, 62, '─', '8');
    g.text(3, 13, 'SHIELD: [ACTIVE] │ ZERO MALWARE │ ZERO DOWNTIME', '2');
    g.text(3, 14, 'NEXT SNAPSHOT: 00:14:22 │ RESPONSE SLA: < 15 MIN', '3');

    return g.frame();
  };
}
