'use client';

import { motion } from 'framer-motion';
import { Magnet, MailCheck, Search, Users } from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-wrapper';
import {
  CanvaIcon,
  CorelDrawIcon,
  GoogleAdsIcon,
  IllustratorIcon,
  MetaIcon,
  PhotoshopIcon,
  PremiereProIcon,
} from '@/components/brand-icons';
import { SKILL_GROUPS } from '@/lib/constants';

const ICONS = {
  'google-ads': GoogleAdsIcon,
  'meta-ads': MetaIcon,
  seo: Search,
  crm: Users,
  'email-automation': MailCheck,
  'lead-generation': Magnet,
  illustrator: IllustratorIcon,
  photoshop: PhotoshopIcon,
  'premiere-pro': PremiereProIcon,
  coreldraw: CorelDrawIcon,
  canva: CanvaIcon,
  'meta-business-suite': MetaIcon,
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function spotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

function SkillCard({ name, icon, color }) {
  const Icon = ICONS[icon];
  const brand = color ?? 'hsl(var(--foreground))';

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={spotlight}
      style={{ '--brand': brand }}
      className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-lg border border-border bg-card p-6 transition-colors duration-300 hover:border-[color:var(--brand)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(160px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary) / 0.08), transparent 70%)',
        }}
      />
      <Icon className="h-9 w-9 text-muted-foreground transition-colors duration-300 group-hover:text-[color:var(--brand)]" />
      <p className="text-center text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
        {name}
      </p>
    </motion.div>
  );
}

export function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-muted/30">
      <div className="container">
        <SectionHeading eyebrow="Skills" title="Platforms & tools I work in" />

        <div className="space-y-14">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="mb-7 flex items-center gap-4">
                <h3 className="text-xl font-bold sm:text-2xl">{group.title}</h3>
                <div className="h-px flex-1 bg-border" />
              </div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={gridVariants}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
              >
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
