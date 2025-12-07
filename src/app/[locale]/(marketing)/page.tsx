'use client';

import React from 'react';
import { HeroSection } from '@/src/components/marketing/HeroSection';
import { ChallengesSection } from '@/src/components/marketing/ChallengesSection';

export default function LandingPage() {
    return (
        <>
            <HeroSection />
            <ChallengesSection />
            {/* Les autres sections viendront ici */}
        </>
    );
}

