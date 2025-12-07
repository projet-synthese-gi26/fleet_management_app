'use client';

import { useTheme } from '../contexts/ThemeContext';
import { Dictionary } from '../i18n/dictionaries';
import { Locale } from '../i18n/config';
import Link from 'next/link';
import { Sun, Moon, Globe, Car, Users, MapPin, BarChart3 } from 'lucide-react';
import styles from './LandingContent.module.css';

interface LandingContentProps {
    dict: Dictionary;
    lang: Locale;
}

export default function LandingContent({ dict, lang }: LandingContentProps) {
    const { themeMode, toggleTheme } = useTheme();

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <Car size={32} />
                        <span>FleetManager</span>
                    </div>

                    <div className={styles.headerActions}>
                        <select
                            className={styles.languageSelect}
                            value={lang}
                            onChange={(e) => {
                                window.location.href = `/${e.target.value}`;
                            }}
                        >
                            <option value="fr">🇫🇷 Français</option>
                            <option value="en">🇬🇧 English</option>
                        </select>

                        <button
                            className={styles.themeToggle}
                            onClick={toggleTheme}
                            aria-label={dict.theme.toggle}
                        >
                            {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        {dict.common.welcome}
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Gérez votre flotte de véhicules en temps réel avec efficacité
                    </p>
                    <div className={styles.heroCta}>
                        <Link href={`/${lang}/dashboard`} className={styles.primaryButton}>
                            {dict.navigation.dashboard}
                        </Link>
                        <Link href={`/${lang}/fleets`} className={styles.secondaryButton}>
                            {dict.navigation.fleets}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <h2 className={styles.sectionTitle}>Fonctionnalités principales</h2>

                <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <Car size={32} />
                        </div>
                        <h3>{dict.navigation.vehicles}</h3>
                        <p>Gérez tous vos véhicules en un seul endroit avec un suivi en temps réel</p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <Users size={32} />
                        </div>
                        <h3>{dict.navigation.drivers}</h3>
                        <p>Suivez vos conducteurs et leurs performances en temps réel</p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <MapPin size={32} />
                        </div>
                        <h3>{dict.navigation.trips}</h3>
                        <p>Planifiez et surveillez tous les trajets de votre flotte</p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <BarChart3 size={32} />
                        </div>
                        <h3>{dict.navigation.reports}</h3>
                        <p>Analysez les performances avec des rapports détaillés</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLogo}>
                        <Car size={24} />
                        <span>FleetManager</span>
                    </div>
                    <p>© 2024 FleetManager. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}