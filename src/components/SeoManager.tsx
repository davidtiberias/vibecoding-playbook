// src/components/SeoManager.tsx
import React from 'react';
import { ViewType } from '../types';
import { seoConfig } from '../config/seo';

interface SeoManagerProps {
    activeView: ViewType;
}

const SeoManager: React.FC<SeoManagerProps> = ({ activeView }) => {
    const meta = seoConfig[activeView] || seoConfig.workflow; // Default to workflow

    // With React 19, you can just return these tags directly.
    // React will automatically move them to the document <head>.
    return (
        <>
            <title>{meta.title} - Vibecoding Playbook</title>
            <meta name="description" content={meta.description} />
            <link rel="canonical" href="https://davidtiberias.github.io/vibecoding-playbook/" />
        </>
    );
};

export default SeoManager;