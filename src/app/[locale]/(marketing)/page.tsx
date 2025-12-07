'use client';

import { HeroSection } from '@/src/components/marketing/HeroSection';
import { ChallengesSection } from '@/src/components/marketing/ChallengesSection';
import { FeaturesSection } from '@/src/components/marketing/FeaturesSection';
import { BenefitsSection } from '@/src/components/marketing/BenefitsSection';
import { StepsSection } from '@/src/components/marketing/StepsSection';
import { ContactSection } from '@/src/components/marketing/ContactSection';

export default function LandingPage() {
    return (
        <>
            <HeroSection />
            <ChallengesSection />
            <FeaturesSection />
            <BenefitsSection />
            <StepsSection />
            <ContactSection />
        </>
    );
}