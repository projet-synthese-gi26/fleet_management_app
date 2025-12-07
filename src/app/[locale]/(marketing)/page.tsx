'use client';

import { HeroSection } from '@/components/marketing/HeroSection';
import { ChallengesSection } from '@/components/marketing/ChallengesSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { BenefitsSection } from '@/components/marketing/BenefitsSection';
import { StepsSection } from '@/components/marketing/StepsSection';
import { ContactSection } from '@/components/marketing/ContactSection';

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