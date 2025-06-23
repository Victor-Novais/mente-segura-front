// pages/terms.tsx
import React from 'react'
import TermsAndPrivacy from '@/components/TermsAndPrivacy'
import Footer from '@/components/Footer'

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <TermsAndPrivacy />
            </main>
            <Footer />
        </div>
    )
}
