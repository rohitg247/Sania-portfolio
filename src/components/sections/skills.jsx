'use client';

import { SectionWrapper, SectionHeading, FadeIn } from '@/components/section-wrapper';
import { SkillBall } from '@/components/canvas/skill-ball';
import { SKILL_GROUPS } from '@/lib/constants';

export function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-muted/30">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Platforms & tools I work in"
          subtitle="Drag a ball to spin it."
        />

        <div className="space-y-16">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <div key={group.title}>
              <div className="mb-9 flex items-center gap-4">
                <h3 className="text-xl font-bold sm:text-2xl">{group.title}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
                {group.skills.map((skill, i) => (
                  <FadeIn key={skill.name} delay={Math.min(i * 0.07, 0.35) + groupIndex * 0.05}>
                    <SkillBall name={skill.name} icon={skill.icon} />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
