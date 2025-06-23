'use client'

import { useTour } from '@reactour/tour'
import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'

export function StartTourButton() {
    const { setIsOpen } = useTour()

    return (
        <Button
            variant="outline"
            onClick={() => setIsOpen(true)}
            className="gap-2"
        >
            <HelpCircle className="h-4 w-4" />
            Ver Tour
        </Button>
    )
}
